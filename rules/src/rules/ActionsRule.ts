import { CustomMove, isDeleteItemType, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import countBy from 'lodash/countBy'
import parseInt from 'lodash/parseInt'
import { Card } from '../material/Card'
import { CardId } from '../material/cards/CardId'
import { CardInfo } from '../material/cards/CardInfo'
import { CardsInfo } from '../material/cards/CardsInfo'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, goldAmount, isGold } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { canPay, PayCardRule } from './PayCardRule'
import { BuildCost, Cost, Production, ProductionRule } from './ProductionRule'
import { RuleId } from './RuleId'

export class ActionsRule extends PlayerTurnRule {
  onRuleStart() {
    for (const card of this.activeCards.getItems<CardId>()) {
      for (const effect of CardsInfo[card.id!.front].effects) {
        if (effect.type === EffectType.TradeCalamity) {
          const cardToTrade = this.cardsInEventArea.id<CardId>(id => id.front === effect.card)
          if (cardToTrade.length > 0) {
            return [cardToTrade.selectItem(), this.rules().startRule(RuleId.TradeCards)]
          }
        }
      }
    }
    return []
  }

  getPlayerMoves() {
    return [
      ...this.discardDice,
      ...this.flipResultTokens,
      ...this.moveAffordableCardsToCivilisationArea,
      ...this.discardEffects,
      ...this.tiltGoldBonusCards,
      ...this.spendLegacyGoldBonus,
      this.rules().customMove(CustomMoveType.Pass)
    ]
  }

  get discardDice(): MaterialMove[] {
    const dice = this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
    if (dice.length === 1 && getDiceSymbol(dice.getItem()!) !== DiceSymbol.GoldenAge && this.cardsICanTrade.length === 0) return []
    return dice.moveItems(diceToDiscardTile)
  }

  get flipResultTokens() {
    const tokens = this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player).rotation(undefined)
    return this.cardsICanTrade.length > 0 ? tokens.rotateItems(true) : tokens.id(isGold).rotateItems(true)
  }

  get moveAffordableCardsToCivilisationArea(): MaterialMove[] {
    const production = new ProductionRule(this.game).getProduction(this.player)
    return this.cardsInEventArea.id<CardId>(id => this.canAfford(id.front, production))
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  get cardsInEventArea() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
  }

  get cardsICanTrade() {
    return this.cardsInEventArea.id<CardId>(id => !CardsInfo[id.front].effects.some(effect => effect.type === EffectType.NonTransmissible))
  }

  canAfford(card: Card, production: Production) {
    if (this.isFree(card)) return true
    const cardInfo = CardsInfo[card]
    const goldCost = this.getGoldCost(cardInfo)
    const buildCost: BuildCost = { population: this.getPopulationCost(cardInfo), resources: CardsInfo[card].resourcesCost }
    const cost: Cost = goldCost ? { choices: [buildCost, { gold: goldCost }] } : buildCost
    return canPay(cost, production)
  }

  getPopulationCost(cardInfo: CardInfo) {
    let cost = cardInfo.populationCost + this.getPopulationToLose()
    for (const effect of cardInfo.effects) {
      if (effect.type === EffectType.Discount && new ConditionRules(this.game).hasCondition(effect.condition)) {
        cost -= effect.population
      } else if (effect.type === EffectType.CostPerBonus) {
        return sumBy(this.activeCards.getItems<CardId>(), card => CardsInfo[card.id!.front].bonus.length)
      }
    }
    for (const card of this.activeCards.getItems<CardId>()) {
      for (const effect of CardsInfo[card.id!.front].effects) {
        if (effect.type === EffectType.CardTypeDiscount && cardInfo.type === effect.cardType) {
          cost -= effect.discount
        }
      }
    }
    return Math.max(0, cost)
  }

  getGoldCost(cardInfo: CardInfo) {
    for (const effect of cardInfo.effects) {
      if (effect.type === EffectType.GoldCost && new ConditionRules(this.game).hasCondition(effect.condition)) {
        return effect.cost
      }
    }
    return cardInfo.goldCost
  }

  getPopulationToLose() {
    if (this.remind(Memory.PopulationLost)) return 0
    const conditionRules = new ConditionRules(this.game)
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .getItems<CardId>().filter(item => CardsInfo[item.id!.front].effects.some(effect =>
        effect.type === EffectType.LosePopulation && conditionRules.hasCondition(effect.condition, this.player)
      )).length
  }

  get discardEffects() {
    return this.cardsInEventArea.id<CardId>(id => this.canDiscard(id.front)).moveItems({ type: LocationType.Discard })
  }

  get activeCards() {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z).player(this.player)
  }

  get tiltGoldBonusCards() {
    return this.activeCards.rotation(undefined).id<CardId>(id => id.front && CardsInfo[id.front].bonus.some(isGold)).rotateItems(true)
  }

  get spendLegacyGoldBonus() {
    if (this.remind(Memory.LegacyUsed)) return []
    return this.legacyCards.id<CardId>(id => id.front && CardsInfo[id.front].bonus.some(isGold)).deleteItems()
  }

  get legacyCards() {
    return this.material(MaterialType.Card).location(LocationType.Legacy).player(this.player)
  }

  canDiscard(card: Card) {
    const conditionRules = new ConditionRules(this.game)
    return CardsInfo[card].effects.some(effect => effect.type === EffectType.Discard && conditionRules.hasCondition(effect.condition))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea
      && this.material(MaterialType.Card).getItem(move.itemIndex)!.location.type === LocationType.EventArea) {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front
      const cardInfo = CardsInfo[card]
      if (this.isFree(card)) {
        return new PayCardRule(this.game).onCardAcquired(move.itemIndex)
      } else {
        this.memorize(Memory.CardToPay, move.itemIndex)
        this.memorize(Memory.PopulationCost, this.getPopulationCost(cardInfo))
        this.memorize(Memory.ResourcesCost, cardInfo.resourcesCost)
        this.memorize(Memory.GoldCost, this.getGoldCost(cardInfo))
        if (this.getPopulationToLose() > 0) {
          this.memorize(Memory.PopulationLost, true)
        }
        return [this.rules().startRule(RuleId.PayCard)]
      }
    } else if (isDeleteItemType(MaterialType.Card)(move)) {
      this.memorize(Memory.LegacyUsed, true)
      return [this.gainBonusGold(move.itemIndex)]
    }
    return []
  }

  isFree(card: Card) {
    const conditionRules = new ConditionRules(this.game)
    return CardsInfo[card].effects.some(effect => effect.type === EffectType.Free && conditionRules.hasCondition(effect.condition))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice) {
      const diceSymbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      if (diceSymbol === DiceSymbol.ReRoll) {
        return [this.rules().startRule(RuleId.UseReRollDie)]
      } else if (diceSymbol === DiceSymbol.GoldenAge && this.hasRotatedCard()) {
        return [this.rules().startRule(RuleId.UseGoldenAgeDie)]
      } else if (isGold(diceSymbol)) {
        return [this.rules().startRule(RuleId.UseGoldDie)]
      } else {
        return [this.rules().startRule(RuleId.UseDiscardedDie)]
      }
    } else if (isMoveItem(move) && move.itemType === MaterialType.ResultToken && move.location.rotation) {
      if (isGold(this.material(MaterialType.ResultToken).getItem<DiceSymbol>(move.itemIndex)!.id!)) {
        return [this.rules().startRule(RuleId.UseGoldResultToken)]
      } else {
        return [this.rules().startRule(RuleId.TradeCards)]
      }
    } else if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.rotation) {
      return [this.gainBonusGold(move.itemIndex)]
    }
    return []
  }

  gainBonusGold(cardIndex: number) {
    const goldBonus = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(cardIndex)!.id!.front].bonus.find(isGold)!
    return this.material(MaterialType.Coin).createItem(
      { quantity: goldAmount(goldBonus), location: { type: LocationType.PlayerCoins, player: this.player } }
    )
  }

  hasRotatedCard() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player)
      .rotation(true).length > 0
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.Pass) {
      const activePlayer = this.material(MaterialType.DiscardTile).getItem()?.location.player
      if (this.player === activePlayer) {
        this.memorize(Memory.Wars, this.countWars)
        moves.push(...this.material(MaterialType.Dice).location(LocationType.PlayerResources)
          .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation })))
        const dice = this.material(MaterialType.Dice).id(id => id !== DiceType.Special).getItems()
        const diceSymbolCount = countBy(dice, getDiceSymbol)
        for (const diceSymbol in diceSymbolCount) {
          moves.push(...this.material(MaterialType.ResultToken).location(LocationType.ResultTokenStock)
            .id(parseInt(diceSymbol)).limit(diceSymbolCount[diceSymbol])
            .selectItems())
        }
        moves.push(this.rules().startRule(RuleId.Calamities))
      } else {
        moves.push(this.rules().startRule(RuleId.Wars))
      }
    }
    return moves
  }

  get countWars() {
    const dice = this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player).id(DiceType.Special).getItems()
    const diceSymbol = countBy(dice, getDiceSymbol)
    const wars = diceSymbol[DiceSymbol.War] ?? 0
    const multipliers = diceSymbol[DiceSymbol.Multiplier] ?? 0
    return wars ? wars + multipliers : 0
  }
}