import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Achievement, getAchievementValue } from '../material/Achievement'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class WarOutcomeRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const attacker = this.remind<PlayerColor>(Memory.Attacker)
    const defender = this.remind<PlayerColor>(Memory.Defender)
    const attackerStrength = this.remind<number>(Memory.Strength, attacker)
    const defenderStrength = this.remind<number>(Memory.Strength, defender)
    if (attackerStrength > defenderStrength) {
      const tokens = this.getBestTokensWorthMax(defender, attackerStrength - defenderStrength)
      if (tokens.length) {
        moves.push(tokens.moveItem({ type: LocationType.PlayerAchievements, player: attacker }))
      }
    }
    moves.push(this.rules().startPlayerTurn(RuleId.Wars, attacker))
    return moves
  }

  getBestTokensWorthMax(player: PlayerColor, value: number) {
    const tokens = this.material(MaterialType.AchievementToken).player(player).id<Achievement>(id => getAchievementValue(id) <= value)
    const bestValue = Math.max(...tokens.getItems<Achievement>().map(item => getAchievementValue(item.id!)))
    return tokens.id<Achievement>(id => getAchievementValue(id) === bestValue)
  }

  onRuleEnd() {
    this.memorize(Memory.Wars, wars => wars - 1)
    return []
  }
}