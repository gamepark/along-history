import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
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
      this.memorize(Memory.PopulationCost, cardInfo.populationCost)
      this.memorize(Memory.ResourcesCost, cardInfo.resourcesCost)
      return [this.rules().startRule(RuleId.PayCard)]
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.rules().startRule(RuleId.Calamities)]
    }
    return []
  }
}