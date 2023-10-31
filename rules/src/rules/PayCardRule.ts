import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class PayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return []
  }
}