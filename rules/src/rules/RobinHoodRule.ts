import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { TradeCardsRule } from './TradeCardsRule'

export class RobinHoodRule extends TradeCardsRule {
  onRuleStart() {
    const richestOpponents = this.richestOpponents
    if (richestOpponents.length === 0) {
      return [this.startRule(RuleId.Actions)]
    } else if (richestOpponents.length === 1) {
      const coins = this.material(MaterialType.Coin).player(richestOpponents[0])
      return [coins.moveItem({ type: LocationType.PlayerCoins, player: this.player }, coins.getQuantity())]
    }
    return []
  }

  getPlayerMoves() {
    const gold = this.remind(Memory.GoldCost)
    if (gold === undefined) {
      return this.richestOpponents.map(player => {
        const coins = this.material(MaterialType.Coin).player(player)
        return coins.moveItem({ type: LocationType.PlayerCoins, player: this.player }, coins.getQuantity())
        }
      )
    } else {
      return this.opponents.map(player =>
        this.material(MaterialType.Coin).player(this.player).moveItem({ type: LocationType.PlayerCoins, player }, gold)
      )
    }
  }

  get opponents() {
    return this.game.players.filter(player => player !== this.player)
  }

  get richestOpponents() {
    const gold = Math.max(...this.opponents.map(player => this.material(MaterialType.Coin).player(player).getQuantity()))
    if (gold === 0) return []
    return this.game.players.filter(player => player !== this.player && this.material(MaterialType.Coin).player(player).getQuantity() === gold)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {
      const gold = this.remind(Memory.GoldCost)
      if (gold === undefined && (move.quantity ?? 1) > 1) {
        this.memorize(Memory.GoldCost, Math.floor(move.quantity! / 2))
      } else {
        return [this.startRule(RuleId.Actions)]
      }
    }
    return []
  }

  onRuleEnd() {
    this.forget(Memory.GoldCost)
    return []
  }
}