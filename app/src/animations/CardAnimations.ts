import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { MaterialAnimationContext, MaterialAnimations, MoveItemAnimations } from '@gamepark/react-game'
import { ItemMoveType, MoveItem } from '@gamepark/rules-api'

export class CardAnimations extends MaterialAnimations {
  constructor() {
    super()
    this.animations[ItemMoveType.Move] = new MoveCardAnimation()
  }
}

class MoveCardAnimation extends MoveItemAnimations {
  getPreDuration(move: MoveItem, context: MaterialAnimationContext): number {
    if (context.game.rule?.id === RuleId.PayCard && context.game.rule?.player === context.playerId) {
      return 0
    }
    return super.getPreDuration(move, context)
  }
}