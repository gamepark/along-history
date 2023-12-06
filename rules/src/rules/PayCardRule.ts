import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, playMove } from '@gamepark/rules-api'
import { intersection } from 'lodash'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { Card } from '../material/Card'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, isPopulationSymbol, isResource } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { Memory } from './Memory'
import { Cost, Production, ProductionRule, VersatileProduction } from './ProductionRule'
import { RuleId } from './RuleId'
import { UpkeepRule } from './UpkeepRule'

export class PayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const populationCost = this.remind<number>(Memory.PopulationCost)
    const mustSpendDice = this.mustSpendDice
    if (populationCost > 0) {
      moves.push(...this.discardPopulationDice)
      if (!mustSpendDice) {
        moves.push(...this.flipPopulationResultToken)
      }
    }
    const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
    const resourceDie = this.playerDice.id(DiceType.Resource)
    const resourceDieItem = resourceDie.getItem()
    if (resourceDieItem) {
      const dieResource = getDiceSymbol(resourceDieItem)
      if (isResource(dieResource) && resourcesCost.includes(dieResource)) {
        moves.push(resourceDie.moveItem(diceToDiscardTile))
      }
    }
    if (!mustSpendDice) {
      const resourceResultToken = this.playerResultTokens.id(isResource)
      if (resourceResultToken.length && resourcesCost.includes(resourceResultToken.getItem()!.id)) {
        moves.push(resourceResultToken.rotateItem(true))
      }
      moves.push(...this.flipCardWithBonus(populationCost > 0, resourcesCost))
      const universalResource = this.material(MaterialType.UniversalResource).player(this.player)
      if (universalResource.length) {
        moves.push(universalResource.moveItem({ type: LocationType.UniversalResourceStock }))
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

  get discardPopulationDice() {
    return this.playerDice.id(DiceType.Population).moveItems(diceToDiscardTile)
  }

  get flipPopulationResultToken() {
    return this.playerResultTokens.id(isPopulationSymbol).rotateItems(true)
  }

  flipCardWithBonus(population: boolean, resources: (Resource | Bonus)[]) {
    return this.bonusCards.id<CardId>(cardId =>
      (population && CardsInfo[cardId.front].bonus.includes(Bonus.Population))
      || intersection(CardsInfo[cardId.front].bonus, resources).length > 0
    ).rotateItems(true)
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
    playMove(rules, move)
    const remainingCost = { population: rules.remind<number>(Memory.PopulationCost) ?? 0, resources: rules.remind<Resource[]>(Memory.ResourcesCost) ?? [] }
    return canPay(remainingCost, new ProductionRule(futureGame).getProduction(this.player))
  }

  get costPaid() {
    return this.remind<number>(Memory.PopulationCost) === 0 && this.remind<Resource[]>(Memory.ResourcesCost).length === 0
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      const diceSymbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      if (diceSymbol === DiceSymbol.GoldenAge) {
        return new UpkeepRule(this.game).unRotateCards
      } else {
        this.payDice(diceSymbol)
      }
    } else {
      this.forget(Memory.DieToMultiply)
      this.forget(Memory.Multiplier)
      if (isMoveItem(move) && move.itemType === MaterialType.ResultToken && move.location.rotation) {
        this.pay(this.material(MaterialType.ResultToken).getItem(move.itemIndex)!.id)
      } else if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.rotation) {
        const bonus = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front].bonus
        for (const symbol of bonus) {
          this.pay(symbol)
        }
      } else if (isMoveItem(move) && move.itemType === MaterialType.UniversalResource && move.location.type === LocationType.UniversalResourceStock) {
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
      }
    }
    if (this.costPaid) {
      return [this.rules().startRule(RuleId.Actions)]
    }
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
        || (isResource(dieToMultiply) && !this.remind<Resource[]>(Memory.ResourcesCost).includes(dieToMultiply))) {
        this.forget(Memory.DieToMultiply)
        this.forget(Memory.Multiplier)
      }
    }
  }

  pay(symbol: DiceSymbol | Resource | Bonus) {
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

  onCardAcquired(card: Card) {
    const moves: MaterialMove[] = []
    const cardInfo = CardsInfo[card]
    if (cardInfo.type === CardType.Wonder
      && this.material(MaterialType.UniversalResource).player(this.player).getQuantity() < 2) {
      moves.push(this.material(MaterialType.UniversalResource).location(LocationType.UniversalResourceStock)
        .moveItem({ type: LocationType.PlayerUniversalResource, player: this.player }, 1))
    }
    this.memorize(Memory.CardAcquired, true)
    return moves
  }

  onRuleEnd() {
    const card = this.material(MaterialType.Card).getItem<CardId>(this.remind<number>(Memory.CardToPay))!.id!.front
    const moves: MaterialMove[] = this.onCardAcquired(card)
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

function canPayWithVersatileProduction({ population, resources }: Cost, production: VersatileProduction): boolean {
  const { populationToMultiply, multipliers, universalResources, resourceDie } = production
  if (resources.length === 0) {
    return universalResources * 3 + populationToMultiply * (multipliers === 2 ? 3 : multipliers) >= population
  }
  if (multipliers > 0 && resourceDie && resources.includes(resourceDie) && canPayWithVersatileProduction(
    { population, resources: removeOne(resources, resourceDie) }, { ...production, multipliers: multipliers - 1 })) {
    return true
  }
  return universalResources >= resources.length && canPayWithVersatileProduction(
    { population, resources: [] },
    { ...production, universalResources: universalResources - resources.length })
}

function removeOne<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item)
  return array.slice(0, index).concat(array.slice(index + 1))
}
