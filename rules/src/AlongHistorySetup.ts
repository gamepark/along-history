import { listingToList, MaterialGameSetup } from '@gamepark/rules-api'
import { AlongHistoryOptions } from './AlongHistoryOptions'
import { AlongHistoryRules } from './AlongHistoryRules'
import { Age, AgesCards } from './material/Age'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AlongHistorySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AlongHistoryOptions> {
  Rules = AlongHistoryRules

  setupMaterial(_options: AlongHistoryOptions) {
    this.material(MaterialType.Card).createItems(listingToList(AgesCards[Age.Prehistory]).map(card => (
      { id: { front: card, back: Age.Prehistory }, location: { type: LocationType.Deck } }
    )))
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}