import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceType, getDiceSymbol } from '../material/Dices'
import { isPopulationSymbol } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'

export class PayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const populationCost = this.remind<number>(Memory.PopulationCost)
    if (populationCost > 0) {
      moves.push(...this.discardPopulationDice)
    }
    return moves
  }

  get discardPopulationDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).id(DiceType.Population)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      const symbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      if (isPopulationSymbol(symbol)) {
        this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - symbol, 0))
      }
    }
    return []
  }
}