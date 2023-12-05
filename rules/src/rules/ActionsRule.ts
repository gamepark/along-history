import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import countBy from 'lodash/countBy'
import parseInt from 'lodash/parseInt'
import { Card } from '../material/Card'
import { CardId } from '../material/cards/CardId'
import { CardInfo } from '../material/cards/CardInfo'
import { CardsInfo } from '../material/cards/CardsInfo'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, isGold } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { canPay, PayCardRule } from './PayCardRule'
import { BuildCost, Cost, Production, ProductionRule } from './ProductionRule'
import { RuleId } from './RuleId'

export class ActionsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      ...this.discardDice,
      ...this.flipResultTokens,
      ...this.moveAffordableCardsToCivilisationArea,
      ...this.discardEffects,
      this.rules().customMove(CustomMoveType.Pass)
    ]
  }

  get discardDice(): MaterialMove[] {
    const dice = this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
    if (dice.length === 1 && getDiceSymbol(dice.getItem()!) !== DiceSymbol.GoldenAge && this.cardsInEventArea.length === 0) return []
    return dice.moveItems(diceToDiscardTile)
  }

  get flipResultTokens() {
    return this.cardsInEventArea.length > 0 ?
      this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player).rotation(undefined).rotateItems(true)
      : []
  }

  get moveAffordableCardsToCivilisationArea(): MaterialMove[] {
    const production = new ProductionRule(this.game).getProduction(this.player)
    return this.cardsInEventArea.id<CardId>(id => this.canAfford(id.front, production))
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  get cardsInEventArea() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
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
      }
    }
    return Math.max(0, cost)
  }

  getGoldCost(cardInfo: CardInfo) {
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
        return new PayCardRule(this.game).onCardAcquired(card)
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
      return [this.rules().startRule(RuleId.TradeCards)]
    }
    return []
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