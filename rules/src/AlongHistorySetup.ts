import { listingToList, MaterialGameSetup } from '@gamepark/rules-api'
import { AgesOption, AlongHistoryOptions } from './AlongHistoryOptions'
import { AlongHistoryRules } from './AlongHistoryRules'
import { Achievement, achievements, getAchievementValue } from './material/Achievement'
import { AchievementBoardLocations } from './material/AchievementBoard'
import { Age, AgesCardsListing } from './material/Age'
import { Card } from './material/Card'
import { CardId } from './material/cards/CardId'
import { CardsInfo } from './material/cards/CardsInfo'
import { CardType } from './material/cards/CardType'
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
    this.setupDeck(agesBounds[0])
    this.setupCivilisationTokens()
    this.setupResourceItems(agesBounds[0])
    this.setupAchievementTokens(agesBounds[0])
    this.setupEventAreas()
    this.setupDiscardTile()
  }

  setupDeck(age: Age) {
    this.material(MaterialType.Card).createItems(listingToList(AgesCardsListing[age]).map(card => (
      { id: { front: card, back: age }, location: { type: LocationType.Deck } }
    )))
    this.material(MaterialType.Card).shuffle()
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

  setupAchievementTokens(age: Age) {
    this.material(MaterialType.AchievementToken).createItems(this.getAchievements(age).map(achievement => (
      { id: achievement, location: { type: LocationType.Table } }
    )))
    this.material(MaterialType.AchievementToken).shuffle()
    for (let x = 1; x < AchievementBoardLocations.length; x++) {
      for (const y of AchievementBoardLocations[x]) {
        this.material(MaterialType.AchievementToken).location(LocationType.Table).id<Achievement>(id => getAchievementValue(id) === x)
          .moveItem({ type: LocationType.AchievementsBoard, x, y })
      }
    }
    this.material(MaterialType.AchievementToken).location(LocationType.Table).deleteItems()
  }

  getAchievements(age: Age) {
    if (age === Age.Prehistory) {
      return achievements.filter(achievement => achievement !== Achievement.Gold15)
    } else {
      return achievements
    }
  }

  setupEventAreas() {
    for (const player of this.players) {
      this.setupPlayerEventArea(player)
    }
    const discard = this.material(MaterialType.Card).location(LocationType.Discard)
    if (discard.length) {
      discard.moveItems({ type: LocationType.Deck })
      this.material(MaterialType.Card).location(LocationType.Deck).shuffle()
    }
  }

  setupPlayerEventArea(player: PlayerColor) {
    this.material(MaterialType.Card).location(LocationType.Deck).deck().deal({ type: LocationType.EventArea, player }, 3)
    this.discardCalamitiesAndWonders(player)
  }

  discardCalamitiesAndWonders(player: PlayerColor) {
    const cards = this.material(MaterialType.Card).location(LocationType.EventArea).player(player).id(isWonderOrCalamity)
    if (cards.length) {
      cards.moveItems({ type: LocationType.Discard })
      this.material(MaterialType.Card).location(LocationType.Deck).deck().deal({ type: LocationType.EventArea, player }, cards.length)
      this.discardCalamitiesAndWonders(player)
    }
  }

  setupDiscardTile() {
    this.material(MaterialType.DiscardTile).createItem({ location: { type: LocationType.PlayerDiscardTile, player: this.players[0] } })
  }

  start() {
    this.startPlayerTurn(RuleId.RollDice, this.players[0])
  }
}

function isWonderOrCalamity(cardId: CardId) {
  const type = CardsInfo[cardId.front].type
  return type === CardType.Wonder || type === CardType.Calamity
}

const AgesBounds: Record<AgesOption, [Age, Age]> = {
  [AgesOption.Prehistory]: [Age.Prehistory, Age.Prehistory],
  [AgesOption.Antiquity]: [Age.Antiquity, Age.Antiquity],
  [AgesOption.MiddleAges]: [Age.MiddleAges, Age.MiddleAges],
  [AgesOption.PrehistoryToAntiquity]: [Age.Prehistory, Age.Antiquity],
  [AgesOption.AntiquityToMiddleAges]: [Age.Antiquity, Age.MiddleAges],
  [AgesOption.PrehistoryToMiddleAges]: [Age.MiddleAges, Age.MiddleAges]
}
