import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { maxBy } from 'lodash'
import { Achievement, getAchievementValue } from '../material/Achievement'
import { DiceType } from '../material/Dices'
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
    moves.push(...this.material(MaterialType.Dice).id(DiceType.Population).moveItems(item => (
      { type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }
    )))
    moves.push(this.rules().startPlayerTurn(RuleId.Wars, attacker))
    return moves
  }

  getBestTokensWorthMax(player: PlayerColor, value: number) {
    const tokens = this.material(MaterialType.AchievementToken).player(player).id<Achievement>(id => getAchievementValue(id) <= value)
    const bestValue = maxBy(tokens.getItems<Achievement>(), item => getAchievementValue(item.id!)) ?? 0
    return tokens.id<Achievement>(id => getAchievementValue(id) === bestValue)
  }

  onRuleEnd() {
    this.forget(Memory.Attacker)
    this.forget(Memory.Defender)
    this.forget(Memory.Strength)
    this.memorize(Memory.Wars, wars => wars - 1)
    return []
  }
}