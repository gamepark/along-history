import { listingToList, MaterialGameSetup } from '@gamepark/rules-api'
import { AgesOption, AlongHistoryOptions } from './AlongHistoryOptions'
import { AlongHistoryRules } from './AlongHistoryRules'
import { Age } from './material/Age'
import { DiceCount, DiceType } from './material/Dices'
import { isGold } from './material/DiceSymbol'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ResultTokens } from './material/ResultTokens'
import { PlayerColor } from './PlayerColor'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AlongHistorySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AlongHistoryOptions> {
  Rules = AlongHistoryRules

  setupMaterial(options: AlongHistoryOptions) {
    this.memorize(Memory.Board, options.board)
    const agesBounds = AgesBounds[options.ages ?? AgesOption.Prehistory]
    this.memorize(Memory.FirstAge, agesBounds[0])
    this.memorize(Memory.CurrentAge, agesBounds[0])
    this.memorize(Memory.LastAge, agesBounds[1])
    this.setupCivilisationTokens()
    this.setupResourceItems(agesBounds[0])
    this.setupDiscardTile()
  }

  setupCivilisationTokens() {
    this.material(MaterialType.CivilisationToken).createItems(this.game.players.map(player => (
      { id: player, location: { type: LocationType.AchievementsBoard, x: 0, y: 0 } }
    )))
  }

  getAgeDice(age: Age) {
    if (age === Age.Prehistory) {
      return listingToList(DiceCount).filter(dice => dice !== DiceType.Gold)
    } else {
      return listingToList(DiceCount)
    }
  }

  getAgeResultTokens(age: Age) {
    if (age === Age.Prehistory) {
      return listingToList(ResultTokens).filter(token => !isGold(token))
    } else {
      return listingToList(ResultTokens)
    }
  }

  setupResourceItems(age: Age) {
    this.material(MaterialType.Dice).createItems(this.getAgeDice(age).map(dice => (
      { id: dice, location: { type: LocationType.DiscardTile, parent: 0 } }
    )))
    this.material(MaterialType.ResultToken).createItems(this.getAgeResultTokens(age).map(id => (
      { id, location: { type: LocationType.ResultTokenStock } }
    )))
    this.material(MaterialType.UniversalResource).createItem({ location: { type: LocationType.UniversalResourceStock }, quantity: this.players.length })
    for (const player of this.players) {
      this.material(MaterialType.UniversalResource).createItem({ location: { type: LocationType.PlayerUniversalResource, player } })
    }
  }

  setupDiscardTile() {
    this.material(MaterialType.DiscardTile).createItem({ location: { type: LocationType.PlayerDiscardTile, player: this.players[0] } })
  }

  start() {
    this.startPlayerTurn(RuleId.SetupAge, this.players[0])
  }
}

const AgesBounds: Record<AgesOption, [Age, Age]> = {
  [AgesOption.Prehistory]: [Age.Prehistory, Age.Prehistory],
  [AgesOption.Antiquity]: [Age.Antiquity, Age.Antiquity],
  [AgesOption.MiddleAges]: [Age.MiddleAges, Age.MiddleAges],
  [AgesOption.PrehistoryToAntiquity]: [Age.Prehistory, Age.Antiquity],
  [AgesOption.AntiquityToMiddleAges]: [Age.Antiquity, Age.MiddleAges],
  [AgesOption.PrehistoryToMiddleAges]: [Age.Prehistory, Age.MiddleAges]
}
