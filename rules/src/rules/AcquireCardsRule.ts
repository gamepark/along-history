import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import countBy from 'lodash/countBy'
import parseInt from 'lodash/parseInt'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { Card } from '../material/Card'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { canPay } from './PayCardRule'
import { Cost, Production, ProductionRule } from './ProductionRule'
import { RuleId } from './RuleId'
import { UpkeepRule } from './UpkeepRule'

export class AcquireCardsRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.moveAffordableCardsToCivilisationArea
      .concat(this.discardEffects)
      .concat(this.discardGoldenAgeDice)
      .concat(this.rules().customMove(CustomMoveType.Pass))
  }

  get cardsInEventArea() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
  }

  get moveAffordableCardsToCivilisationArea(): MaterialMove[] {
    const production = new ProductionRule(this.game).getProduction(this.player)
    return this.cardsInEventArea.id<CardId>(id => this.canAfford(id.front, production))
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  canAfford(card: Card, production: Production) {
    if (this.isFree(card)) return true
    const cost: Cost = { population: this.getPopulationCost(card), resources: CardsInfo[card].resourcesCost }
    return canPay(cost, production)
  }

  get discardEffects() {
    return this.cardsInEventArea.id<CardId>(id => this.canDiscard(id.front)).moveItems({ type: LocationType.Discard })
  }

  get discardGoldenAgeDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
      .filter(item => getDiceSymbol(item) === DiceSymbol.GoldenAge).moveItems(diceToDiscardTile)
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea
      && this.material(MaterialType.Card).getItem(move.itemIndex)!.location.type === LocationType.EventArea) {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front
      const cardInfo = CardsInfo[card]
      if (this.isFree(card)) {
        this.memorize(Memory.CardAcquired, true)
      } else {
        this.memorize(Memory.CardToPay, move.itemIndex)
        this.memorize(Memory.PopulationCost, this.getPopulationCost(card))
        this.memorize(Memory.ResourcesCost, cardInfo.resourcesCost)
        if (this.getPopulationToLose() > 0) {
          this.memorize(Memory.PopulationLost, true)
        }
        return [this.rules().startRule(RuleId.PayCard)]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      const diceSymbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      if (diceSymbol === DiceSymbol.GoldenAge) {
        return new UpkeepRule(this.game).unRotateCards
      }
    }
    return []
  }

  isFree(card: Card) {
    return CardsInfo[card].effects.some(effect => effect.type === EffectType.Free && new ConditionRules(this.game).hasCondition(effect.condition))
  }

  canDiscard(card: Card) {
    return CardsInfo[card].effects.some(effect => effect.type === EffectType.Discard && new ConditionRules(this.game).hasCondition(effect.condition))
  }

  getPopulationCost(card: Card) {
    const cardInfo = CardsInfo[card]
    let cost = cardInfo.populationCost + this.getPopulationToLose()
    for (const effect of cardInfo.effects) {
      if (effect.type === EffectType.Discount && new ConditionRules(this.game).hasCondition(effect.condition)) {
        cost -= effect.population
      }
    }
    return Math.max(0, cost)
  }

  getPopulationToLose() {
    if (this.remind(Memory.PopulationLost)) return 0
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .getItems<CardId>().filter(item => CardsInfo[item.id!.front].effects.some(effect =>
        effect.type === EffectType.LosePopulation && new ConditionRules(this.game).hasCondition(effect.condition, this.player)
      )).length
  }

  get countWars() {
    const dice = this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player).id(DiceType.Special).getItems()
    const diceSymbol = countBy(dice, getDiceSymbol)
    return diceSymbol[DiceSymbol.War] ? diceSymbol[DiceSymbol.War] + diceSymbol[DiceSymbol.Multiplier] : 0
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.Pass) {
      if (new AlongHistoryRules(this.game).isActivePlayerTurn) {
        this.memorize(Memory.Wars, this.countWars)
        moves.push(...this.material(MaterialType.Dice).location(LocationType.PlayerResources)
          .moveItems({ type: LocationType.DiscardTile, parent: 0 }))
        const dice = this.material(MaterialType.Dice).id(id => id !== DiceType.Special).getItems()
        const diceSymbolCount = countBy(dice, getDiceSymbol)
        for (const diceSymbol in diceSymbolCount) {
          moves.push(...this.material(MaterialType.ResultToken).location(LocationType.ResultTokenStock)
            .id(parseInt(diceSymbol)).limit(diceSymbolCount[diceSymbol])
            .moveItems({ type: LocationType.PlayerResources, player: this.nextPlayer }))
        }
        moves.push(this.rules().startRule(RuleId.Calamities))
      } else {
        moves.push(this.rules().startRule(RuleId.Wars))
      }
    }
    return moves
  }
}
