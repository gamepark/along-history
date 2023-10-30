import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export abstract class ActivePlayerRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return []
  }
}