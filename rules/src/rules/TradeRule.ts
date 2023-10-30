import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export abstract class TradeRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return []
  }
}