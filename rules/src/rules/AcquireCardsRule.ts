import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { parseInt } from 'lodash'
import countBy from 'lodash/countBy'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { DiceType, getDiceSymbol } from '../material/Dices'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AcquireCardsRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.moveAffordableCardsToCivilisationArea.concat(this.rules().customMove(CustomMoveType.Pass))
  }

  get moveAffordableCardsToCivilisationArea(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea) {
      const cardItem = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!
      const cardInfo = CardsInfo[cardItem.id!.front]
      this.memorize(Memory.CardToPay, move.itemIndex)
      this.memorize(Memory.PopulationCost, cardInfo.populationCost)
      this.memorize(Memory.ResourcesCost, cardInfo.resourcesCost)
      return [this.rules().startRule(RuleId.PayCard)]
    }
    return []
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
