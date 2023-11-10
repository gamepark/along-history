import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { ProductionRule } from './ProductionRule'
import { RuleId } from './RuleId'

export class WarsRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.wars && !this.universalResources) {
      return [this.rules().startRule(RuleId.NewEvents)]
    }
    return []
  }

  get wars() {
    return this.remind(Memory.Wars)
  }

  get universalResources() {
    return new ProductionRule(this.game).getUniversalResources(this.player)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = this.wars ? this.declareWar : [this.spendUniversalResource]
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  get declareWar() {
    return this.game.players.filter(player => player !== this.player)
      .map(player => this.rules().customMove(CustomMoveType.ChoosePlayer, player))
  }

  get spendUniversalResource() {
    return this.material(MaterialType.UniversalResource).player(this.player).moveItem({ type: LocationType.UniversalResourceStock }, 1)
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      this.forget(Memory.Wars)
      return [this.endWars]
    } else if (move.type === CustomMoveType.ChoosePlayer) {
      this.memorize(Memory.Attacker, this.player)
      this.memorize(Memory.Defender, move.data)
      return [this.rules().startRule(RuleId.PrepareArmy)]
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.UniversalResource) {
      this.memorize(Memory.Wars, 1)
    }
    return []
  }

  get endWars() {
    return this.rules().startRule(RuleId.NewEvents)
  }
}