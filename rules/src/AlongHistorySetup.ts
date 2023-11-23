import { listingToList, MaterialGameSetup } from '@gamepark/rules-api'
import { AlongHistoryOptions } from './AlongHistoryOptions'
import { AlongHistoryRules } from './AlongHistoryRules'
import { Achievement, achievements, getAchievementValue } from './material/Achievement'
import { AchievementBoardLocations } from './material/AchievementBoard'
import { Age, AgesCardsListing } from './material/Age'
import { CardId } from './material/cards/CardId'
import { CardsInfo } from './material/cards/CardsInfo'
import { CardType } from './material/cards/CardType'
import { DiceCount, DiceType } from './material/Dices'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ResultTokens } from './material/ResultTokens'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AlongHistorySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AlongHistoryOptions> {
  Rules = AlongHistoryRules

  setupMaterial(_options: AlongHistoryOptions) {
    this.setupDeck()
    this.setupCivilisationTokens()
    this.setupResourceItems()
    this.setupAchievementTokens()
    this.setupEventAreas()
    this.setupDiscardTile()
  }

  setupDeck() {
    this.material(MaterialType.Card).createItems(listingToList(AgesCardsListing[Age.Prehistory]).map(card => (
      { id: { front: card, back: Age.Prehistory }, location: { type: LocationType.Deck } }
    )))
    this.material(MaterialType.Card).shuffle()
  }

  setupCivilisationTokens() {
    this.material(MaterialType.CivilisationToken).createItems(this.game.players.map(player => (
      { id: player, location: { type: LocationType.AchievementsBoard, x: 0, y: 0 } }
    )))
  }

  setupResourceItems() {
    this.material(MaterialType.Dice).createItems(listingToList(DiceCount).filter(dice => dice !== DiceType.Gold).map(dice => (
      { id: dice, location: { type: LocationType.DiscardTile, parent: 0 } }
    )))
    this.material(MaterialType.ResultToken).createItems(listingToList(ResultTokens).map(id => (
      { id, location: { type: LocationType.ResultTokenStock } }
    )))
    this.material(MaterialType.UniversalResource).createItem({ location: { type: LocationType.UniversalResourceStock }, quantity: this.players.length })
    for (const player of this.players) {
      this.material(MaterialType.UniversalResource).createItem({ location: { type: LocationType.PlayerUniversalResource, player } })
    }
  }

  setupAchievementTokens() {
    this.material(MaterialType.AchievementToken).createItems(this.achievements.map(achievement => (
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

  get achievements() {
    return achievements.filter(achievement => achievement !== Achievement.Gold15)
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
