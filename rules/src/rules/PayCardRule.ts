import { isDeleteItemType, isMoveItem, ItemMove, MaterialMove, MoveItem, playAction, PlayerTurnRule } from '@gamepark/rules-api'
import { intersection, sumBy } from 'lodash'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { EffectType } from '../material/cards/effects/EffectType'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, goldAmount, isGold, isPopulationSymbol, isResource } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { Memory } from './Memory'
import { PoisonRule } from './PoisonRule'
import { BuildCost, Cost, isBuyCost, isChoiceCost, Production, ProductionRule, VersatileProduction } from './ProductionRule'
import { RuleId } from './RuleId'
import { UpkeepRule } from './UpkeepRule'

export class PayCardRule extends PlayerTurnRule {
  onRuleStart() {
    const production = new ProductionRule(this.game).getProduction()
    const goldCost = this.remind<number | undefined>(Memory.GoldCost)
    if (goldCost && !canPayGold(goldCost, production)) {
      this.forget(Memory.GoldCost)
    }
    if (!canPay({ population: this.remind(Memory.PopulationCost), resources: this.remind(Memory.ResourcesCost) ?? [] }, production)) {
      this.forget(Memory.PopulationCost)
      this.memorize(Memory.ResourcesCost, [])
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const goldCost = this.remind<number | undefined>(Memory.GoldCost)
    if (goldCost !== undefined) {
      moves.push(...this.payGold)
    }
    const populationCost = this.remind<number | undefined>(Memory.PopulationCost)
    const mustSpendDice = this.mustSpendDice
    if (populationCost) {
      moves.push(...this.discardPopulationDice)
      if (!mustSpendDice) {
        moves.push(...this.flipPopulationResultToken)
      }
    }
    const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
    if (resourcesCost) {
      const resourceDie = this.playerDice.id(DiceType.Resource)
      const resourceDieItem = resourceDie.getItem()
      if (resourceDieItem) {
        const dieResource = getDiceSymbol(resourceDieItem)
        if (isResource(dieResource) && resourcesCost.includes(dieResource)) {
          moves.push(resourceDie.moveItem(diceToDiscardTile))
        }
      }
    }
    if (!mustSpendDice) {
      const resourceResultToken = this.playerResultTokens.id(isResource)
      if (resourcesCost && resourceResultToken.length && resourcesCost.includes(resourceResultToken.getItem()!.id)) {
        moves.push(resourceResultToken.rotateItem(true))
      }
      moves.push(...this.useCardWithBonus(!!populationCost, resourcesCost ?? [], !!goldCost))
      if (populationCost || resourcesCost.length) {
        const universalResource = this.material(MaterialType.UniversalResource).player(this.player)
        if (universalResource.length) {
          moves.push(universalResource.moveItem({ type: LocationType.UniversalResourceStock }))
        }
      }
      if (this.hasRotatedCards) {
        moves.push(...this.discardGoldenAgeDice)
      }
    }
    if (this.canUseMultiplier) {
      moves.push(...this.discardMultiplierDice)
    }
    return moves.filter(move => this.willBeAbleToPay(move))
  }

  get playerDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
  }

  get playerResultTokens() {
    return this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player).rotation(undefined)
  }

  get bonusCards() {
    const cardToPay = this.remind<number>(Memory.CardToPay)
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).location(({ z }) => !z).player(this.player).rotation(undefined)
      .filter((_, index) => index !== cardToPay)
  }

  get legacyCards() {
    return this.material(MaterialType.Card).location(LocationType.Legacy).player(this.player)
  }

  get payGold() {
    const moves: MaterialMove[] = [
      ...this.playerDice.id(DiceType.Gold).moveItems(diceToDiscardTile),
      ...this.playerResultTokens.id(isGold).rotateItems(true)
    ]
    const coins = this.material(MaterialType.Coin).player(this.player)
    const quantity = coins.getQuantity()
    if (quantity) {
      const goldCost = this.remind<number>(Memory.GoldCost)
      moves.push(coins.deleteItem(Math.min(goldCost, quantity)))
    }
    return moves
  }

  get discardPopulationDice() {
    return this.playerDice.id(DiceType.Population).moveItems(diceToDiscardTile)
  }

  get flipPopulationResultToken() {
    return this.playerResultTokens.id(isPopulationSymbol).rotateItems(true)
  }

  useCardWithBonus(population: boolean, resources: (Resource | Bonus)[], gold: boolean) {
    const moves: MaterialMove[] = []

    const isUsefulBonus = (bonus: Bonus[]) => (population && bonus.includes(Bonus.Population))
      || intersection(bonus, resources).length > 0 || (gold && bonus.some(isGold))

    moves.push(...this.bonusCards.id<CardId>(cardId => isUsefulBonus(CardsInfo[cardId.front].bonus)).rotateItems(true))

    if (!this.remind(Memory.LegacyUsed)) {
      moves.push(...this.legacyCards.id<CardId>(cardId => isUsefulBonus(CardsInfo[cardId.front].bonus)).deleteItems())
    }

    return moves
  }

  get canUseMultiplier() {
    return this.remind(Memory.DieToMultiply) || this.playerDice.getItems().some(item => item.id !== DiceType.Special)
  }

  get mustSpendDice() {
    return !this.remind(Memory.DieToMultiply) && this.remind(Memory.Multiplier)
  }

  get discardMultiplierDice() {
    return this.playerDice.filter(item => getDiceSymbol(item) === DiceSymbol.Multiplier).moveItems(diceToDiscardTile)
  }

  get hasRotatedCards() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player).rotation(true).length > 0
  }

  get discardGoldenAgeDice() {
    return this.playerDice.filter(item => getDiceSymbol(item) === DiceSymbol.GoldenAge).moveItems(diceToDiscardTile)
  }

  willBeAbleToPay(move: MaterialMove) {
    const futureGame = JSON.parse(JSON.stringify(this.game))
    const rules = new AlongHistoryRules(futureGame)
    playAction(rules, move, this.player)
    const production = new ProductionRule(futureGame).getProduction(this.player)
    const goldCost = rules.remind<number | undefined>(Memory.GoldCost)
    if (goldCost !== undefined && canPayGold(goldCost, production)) return true
    const remainingCost = {
      population: rules.remind<number | undefined>(Memory.PopulationCost) ?? 0,
      resources: rules.remind<Resource[]>(Memory.ResourcesCost) ?? []
    }
    return canPay(remainingCost, production)
  }

  get costPaid() {
    const goldCost = this.remind<number | undefined>(Memory.GoldCost)
    return (goldCost !== undefined && goldCost <= 0)
      || (this.remind<number>(Memory.PopulationCost) === 0 && this.remind<Resource[]>(Memory.ResourcesCost).length === 0)
  }

  beforeItemMove(move: ItemMove<number, number, number>) {
    if (isDeleteItemType(MaterialType.Card)(move)) {
      this.memorize(Memory.LegacyUsed, true)
      return this.afterBonusUsed(move.itemIndex)
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      moves.push(...this.afterDiceDiscarded(move))
    } else {
      this.forget(Memory.DieToMultiply)
      this.forget(Memory.Multiplier)
      if (isMoveItem(move) && move.itemType === MaterialType.ResultToken && move.location.rotation) {
        this.pay(this.material(MaterialType.ResultToken).getItem(move.itemIndex)!.id)
      } else if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.rotation) {
        moves.push(...this.afterBonusUsed(move.itemIndex))
      } else if (isMoveItem(move) && move.itemType === MaterialType.UniversalResource && move.location.type === LocationType.UniversalResourceStock) {
        moves.push(...this.afterUniversalTokenDiscarded())
      } else if (isDeleteItemType(MaterialType.Coin)(move)) {
        this.onPayGold(move.quantity ?? 1)
      }
    }
    if (this.costPaid) {
      moves.push(this.rules().startRule(RuleId.Actions))
    }
    return moves
  }

  afterDiceDiscarded(move: MoveItem) {
    const diceSymbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
    if (diceSymbol === DiceSymbol.GoldenAge) {
      return new UpkeepRule(this.game).unRotateCards
    } else {
      this.payDice(diceSymbol)
      return []
    }
  }

  afterBonusUsed(cardIndex: number) {
    let goldToEarn = 0
    const bonus = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(cardIndex)!.id!.front].bonus
    for (const symbol of bonus) {
      if (isGold(symbol) && this.remind(Memory.GoldCost) === undefined) {
        goldToEarn += goldAmount(symbol)
      } else if (isGold(symbol) || this.remind(Memory.PopulationCost) !== undefined) {
        this.pay(symbol)
      }
    }
    return goldToEarn ? [this.getTakeGoldMove(goldToEarn)] : []
  }

  afterUniversalTokenDiscarded() {
    const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
    const resourcesProduction = new ProductionRule(this.game).getResourcesProduction()
    const nonProducedResourceIndex = resourcesCost.findIndex(resource => !resourcesProduction.includes(resource))
    if (nonProducedResourceIndex !== -1) {
      resourcesCost.splice(nonProducedResourceIndex, 1)
    } else if (this.remind<number>(Memory.PopulationCost) > 0) {
      this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - 3, 0))
    } else {
      resourcesCost.pop()
    }
    this.forget(Memory.GoldCost)
    return []
  }

  payDice(symbol: DiceSymbol) {
    const dieToMultiply = this.remind<DiceSymbol>(Memory.DieToMultiply)
    const multiplier = this.remind<number>(Memory.Multiplier)
    if (symbol === DiceSymbol.Multiplier) {
      if (dieToMultiply !== undefined) {
        for (let i = 0; i < (multiplier ?? 1); i++) {
          this.pay(dieToMultiply)
        }
      }
      this.memorize(Memory.Multiplier, multiplier ? multiplier * 2 : 2)
    } else {
      if (dieToMultiply !== undefined) {
        this.forget(Memory.Multiplier)
        this.pay(symbol)
        this.memorize(Memory.DieToMultiply, symbol)
      } else if (multiplier !== undefined) {
        for (let i = 0; i < multiplier; i++) {
          this.pay(symbol)
        }
        this.forget(Memory.Multiplier)
      } else {
        this.pay(symbol)
        this.memorize(Memory.DieToMultiply, symbol)
      }
    }
    this.forgetDieToMultiplyIfCostAlreadyPaid()
  }

  forgetDieToMultiplyIfCostAlreadyPaid() {
    const dieToMultiply = this.remind(Memory.DieToMultiply)
    if (dieToMultiply) {
      if ((isPopulationSymbol(dieToMultiply) && this.remind<number>(Memory.PopulationCost) === 0)
        || (isGold(dieToMultiply) && this.remind<number>(Memory.GoldCost) <= 0)
        || (isResource(dieToMultiply) && !this.remind<Resource[]>(Memory.ResourcesCost).includes(dieToMultiply))) {
        this.forget(Memory.DieToMultiply)
        this.forget(Memory.Multiplier)
      }
    }
  }

  pay(symbol: DiceSymbol | Resource | Bonus) {
    if (isGold(symbol)) {
      this.onPayGold(goldAmount(symbol))
    } else {
      this.forget(Memory.GoldCost)
      if (isPopulationSymbol(symbol)) {
        this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - symbol, 0))
      } else if (isResource(symbol)) {
        const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
        const index = resourcesCost.indexOf(symbol)
        if (index !== -1) {
          resourcesCost.splice(index, 1)
        }
      }
    }
  }

  onPayGold(gold: number) {
    this.memorize<number>(Memory.GoldCost, cost => cost - gold)
    this.forget(Memory.PopulationCost)
    this.memorize(Memory.ResourcesCost, [])
  }

  onCardAcquired(index = this.remind<number>(Memory.CardToPay)) {
    const moves: MaterialMove[] = []
    const card = this.material(MaterialType.Card).index(index)
    const cardInfo = CardsInfo[card.getItem<CardId>()!.id!.front]
    if (cardInfo.type === CardType.Wonder
      && this.material(MaterialType.UniversalResource).player(this.player).getQuantity() < 2) {
      moves.push(this.material(MaterialType.UniversalResource).location(LocationType.UniversalResourceStock)
        .moveItem({ type: LocationType.PlayerUniversalResource, player: this.player }, 1))
    }
    for (const effect of cardInfo.effects) {
      if (effect.type === EffectType.EarnGold) {
        moves.push(this.getTakeGoldMove(effect.amount))
      } else if (effect.type === EffectType.Destroy) {
        moves.push(...this.activeCards.id<CardId>(id => id?.front === effect.card).moveItems({ type: LocationType.Discard }))
      } else if (effect.type === EffectType.Seize) {
        moves.push(...this.activeCards.player(player => player !== this.player).id<CardId>(id => id?.front === effect.card)
          .moveItems(item => ({ type: LocationType.CivilisationArea, player: this.player, rotation: item.location.rotation })))
      } else if (effect.type === EffectType.Ransom) {
        moves.push(this.rules().startSimultaneousRule(RuleId.Ransom, this.game.players.filter(p => p !== this.player)))
      } else if (effect.type === EffectType.RobinHood) {
        moves.push(this.rules().startRule(RuleId.RobinHood))
      } else if (effect.type === EffectType.TradeOnAcquisition) {
        const targetCard = this.activeCards.id<CardId>(id => id?.front === effect.card)
        if (targetCard.length && this.hasNonCalamityCardInEventArea) {
          moves.push(targetCard.selectItem(), this.rules().startRule(RuleId.TradeOnAcquisition))
        }
      } else if (effect.type === EffectType.Swap) {
        if (this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(p => p !== this.player).length > 0) {
          moves.push(card.selectItem(), this.rules().startRule(RuleId.Swap))
        }
      } else if (effect.type === EffectType.Poison) {
        if (this.activeCards.player(player => player !== this.player).id<CardId>(id => CardsInfo[id!.front].type === CardType.Figure).length > 0) {
          this.memorize(Memory.Calamity, index)
          if (this.game.players.length === 2) {
            moves.push(...new PoisonRule(this.game).poisonPlayer(this.nextPlayer))
          } else {
            moves.push(card.selectItem(), this.rules().startRule(RuleId.Poison))
          }
        }
      }
    }
    this.memorize(Memory.CardAcquired, true)
    return moves
  }

  get activeCards() {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z)
  }

  get hasNonCalamityCardInEventArea() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .id<CardId>(id => CardsInfo[id.front].type !== CardType.Calamity).length > 0
  }

  getTakeGoldMove(quantity: number) {
    return this.material(MaterialType.Coin).createItem({ quantity, location: { type: LocationType.PlayerCoins, player: this.player } })
  }

  onRuleEnd() {
    const moves: MaterialMove[] = this.onCardAcquired()
    const gold = this.remind<number | undefined>(Memory.GoldCost)
    if (gold && gold < 0) {
      moves.push(this.getTakeGoldMove(-gold))
    }
    this.forget(Memory.CardToPay)
    this.forget(Memory.PopulationCost)
    this.forget(Memory.ResourcesCost)
    this.forget(Memory.GoldCost)
    this.forget(Memory.DieToMultiply)
    this.forget(Memory.Multiplier)
    return moves
  }
}

export function canPay(cost: Cost, production: Production): boolean {
  if (isChoiceCost(cost)) {
    return cost.choices.some(choice => canPay(choice, production))
  } else if (isBuyCost(cost)) {
    return canPayGold(cost.gold, production)
  }
  const { population, resources } = cost
  if (population > 0 && production.population > 0) {
    return canPay({ resources, population: population - production.population }, { ...production, population: 0 })
  }
  const resourceToPay = intersection(resources, production.resources)
  if (resourceToPay.length > 0) {
    return canPay({ population, resources: removeOne(resources, resourceToPay[0]) },
      { ...production, resources: removeOne(production.resources, resourceToPay[0]) })
  }
  if (population <= 0 && resources.length === 0) return true
  return canPayWithVersatileProduction(cost, production)
}

function canPayGold(cost: number, production: Production): boolean {
  const { gold, goldToMultiply, multipliers, pastBonuses } = production
  const bestPastGoldBonuses = pastBonuses.length ?
    Math.max(...pastBonuses.map(bonuses => sumBy(bonuses, bonus => isGold(bonus) ? goldAmount(bonus) : 0))) : 0
  return gold + goldToMultiply * (multipliers === 2 ? 3 : multipliers) + bestPastGoldBonuses >= cost
}

function canPayWithVersatileProduction({ population, resources }: BuildCost, production: VersatileProduction): boolean {
  const { populationToMultiply, multipliers, universalResources, resourceDie, pastBonuses } = production
  if (resources.length === 0) {
    const bestPopPastBonus = pastBonuses.length ?
      Math.max(...pastBonuses.map(bonuses => bonuses.filter(bonus => bonus === Bonus.Population).length)) : 0
    return universalResources * 3 + populationToMultiply * (multipliers === 2 ? 3 : multipliers) + bestPopPastBonus >= population
  }
  if (multipliers > 0 && resourceDie && resources.includes(resourceDie) && canPayWithVersatileProduction(
    { population, resources: removeOne(resources, resourceDie) }, { ...production, multipliers: multipliers - 1 })) {
    return true
  }
  if (universalResources >= resources.length && canPayWithVersatileProduction(
    { population, resources: [] },
    { ...production, universalResources: universalResources - resources.length })) {
    return true
  }
  for (const pastBonus of pastBonuses) {
    if ((population > 0 && pastBonus.includes(Bonus.Population)) || intersection<Resource | Bonus>(pastBonus, resources).length > 0) {
      const popAfterBonus = Math.max(population - sumBy(pastBonus, b => b === Bonus.Population ? 1 : 0), 0)
      const resourcesAfterBonus = removeMany(resources, pastBonus.filter(isResource))
      if (canPayWithVersatileProduction({ population: popAfterBonus, resources: resourcesAfterBonus },
        { ...production, pastBonuses: [] })) {
        return true
      }
    }
  }
  return false
}

function removeOne<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item)
  return array.slice(0, index).concat(array.slice(index + 1))
}

function removeMany<T>(array: T[], items: T[]): T[] {
  let result = array
  for (const item of items) {
    const index = array.indexOf(item)
    result = result.slice(0, index).concat(result.slice(index + 1))
  }
  return result
}
