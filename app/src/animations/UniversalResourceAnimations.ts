import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialAnimationContext, MaterialAnimations, MoveItemAnimations } from '@gamepark/react-game'
import { ItemMoveType, MoveItem } from '@gamepark/rules-api'

export class UniversalResourceAnimations extends MaterialAnimations {
  constructor() {
    super()
    this.animations[ItemMoveType.Move] = new MoveUniversalResourceAnimation()
  }
}

class MoveUniversalResourceAnimation extends MoveItemAnimations {
  getPreDuration(move: MoveItem, context: MaterialAnimationContext): number {
    if (context.game.rule?.player === context.playerId && move.location.type === LocationType.UniversalResourceStock) {
      return 0
    }
    return super.getPreDuration(move, context)
  }
}