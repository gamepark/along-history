import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import countBy from 'lodash/countBy'
import parseInt from 'lodash/parseInt'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { Card } from '../material/Card'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { DiceType, getDiceSymbol } from '../material/Dices'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { canPay } from './PayCardRule'
import { Cost, Production, ProductionRule } from './ProductionRule'
import { RuleId } from './RuleId'

export class AcquireCardsRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.moveAffordableCardsToCivilisationArea.concat(this.rules().customMove(CustomMoveType.Pass))
  }

  get moveAffordableCardsToCivilisationArea(): MaterialMove[] {
    const production = new ProductionRule(this.game).getProduction(this.player)
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .id<CardId>(id => this.canAfford(id.front, production))
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  canAfford(card: Card, production: Production) {
    if (this.isFree(card)) return true
    const cost: Cost = { population: this.getPopulationCost(card), resources: CardsInfo[card].resourcesCost }
    return canPay(cost, production)
  }


  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea) {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front
      const cardInfo = CardsInfo[card]
      if (!this.isFree(card)) {
        this.memorize(Memory.CardToPay, move.itemIndex)
        this.memorize(Memory.PopulationCost, this.getPopulationCost(card))
        this.memorize(Memory.ResourcesCost, cardInfo.resourcesCost)
        return [this.rules().startRule(RuleId.PayCard)]
      }
    }
    return []
  }

  isFree(card: Card) {
    return CardsInfo[card].effects.some(effect => effect.type === EffectType.Free && new ConditionRules(this.game).hasCondition(effect.condition))
  }

  getPopulationCost(card: Card) {
    const cardInfo = CardsInfo[card]
    let cost = cardInfo.populationCost
    for (const effect of cardInfo.effects) {
      if (effect.type === EffectType.Discount && new ConditionRules(this.game).hasCondition(effect.condition)) {
        cost -= effect.population
      }
    }
    return Math.max(0, cost)
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.Pass) {
      if (new AlongHistoryRules(this.game).isActivePlayerTurn) {
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
