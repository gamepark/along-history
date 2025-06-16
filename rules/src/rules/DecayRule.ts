import { isMoveItemType, ItemMove, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DecayRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const topCards = this.material(MaterialType.Card)
      .location(LocationType.CivilisationArea)
      .player(this.player)
      .location(({ z }) => z === 0)

    for (const x of topCards.getItems().map((item) => item.location.x)) {
      moves.push(...topCards.location(location => location.x !== x).moveItems(
        { type: LocationType.CivilisationArea, player: this.player, x, z: 1 }
      ))
    }
    return moves
  }

  afterItemMove(_move: ItemMove): MaterialMove[] {
    delete this.game.droppedItems
    return [this.startRule(RuleId.EndOfTurn)]
  }
}

export function isDecayMove(move: MaterialMove): move is MoveItem {
  return isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea && move.location.x !== undefined
}
