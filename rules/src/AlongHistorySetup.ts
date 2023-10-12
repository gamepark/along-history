import { MaterialGameSetup } from '@gamepark/rules-api'
import { AlongHistoryOptions } from './AlongHistoryOptions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AlongHistorySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AlongHistoryOptions> {
  setupMaterial(_options: AlongHistoryOptions) {
  }

  start() {
    return { id: RuleId.PlayerTurn, player: this.game.players[0] }
  }
}