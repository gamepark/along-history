import { isCreateItemsAtOnce, isShuffle, ItemMove, listingToList, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Achievement, achievements, getAchievementValue } from '../material/Achievement'
import { AchievementBoardLocations } from '../material/AchievementBoard'
import { Age, AgesCardsListing } from '../material/Age'
import { Card } from '../material/Card'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SetupAgeRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.createAchievementTokens(), this.createCards(card => !isWonderOrCalamity(card))]
  }

  createAchievementTokens() {
    const age = this.remind<Age>(Memory.CurrentAge)
    return this.material(MaterialType.AchievementToken).createItemsAtOnce(this.getAchievements(age).map(achievement => (
      { id: achievement, location: { type: LocationType.AchievementsBoard, x: 7, y: -3 } }
    )))
  }

  createCards(predicate: (card: Card) => boolean) {
    const age = this.remind<Age>(Memory.CurrentAge)
    return this.material(MaterialType.Card).createItemsAtOnce(
      listingToList(AgesCardsListing[age])
        .filter(predicate)
        .map(card => (
          { id: { front: card, back: age }, location: { type: LocationType.Deck } }
        ))
    )
  }

  getAchievements(age: Age) {
    if (age === Age.Prehistory) {
      return achievements.filter(achievement => achievement !== Achievement.Gold15)
    } else {
      return achievements
    }
  }

  afterItemMove(move: ItemMove) {
    if (move.itemType === MaterialType.AchievementToken) {
      return this.afterAchievementTokenMove(move)
    } else if (move.itemType === MaterialType.Card) {
      return this.afterCardMove(move)
    }
    return []
  }

  afterAchievementTokenMove(move: ItemMove) {
    if (isCreateItemsAtOnce(move)) {
      return [this.material(MaterialType.AchievementToken).shuffle()]
    } else if (isShuffle(move)) {
      const moves: MaterialMove[] = []
      for (let x = 1; x < AchievementBoardLocations.length; x++) {
        const deck = this.material(MaterialType.AchievementToken)
          .location(l => l.type === LocationType.AchievementsBoard && l.x === 7 && l.y === -3)
          .id<Achievement>(id => getAchievementValue(id) === x).deck()
        for (const y of AchievementBoardLocations[x]) {
          moves.push(deck.dealOne({ type: LocationType.AchievementsBoard, x, y }))
        }
      }
      return moves
    }
    return []
  }

  afterCardMove(move: ItemMove) {
    if (isCreateItemsAtOnce(move)) {
      return [this.material(MaterialType.Card).location(LocationType.Deck).shuffle()]
    } else if (isShuffle(move)) {
      if (this.material(MaterialType.Card).location(LocationType.EventArea).length === 0) {
        const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
        return [
          ...this.game.players.flatMap(player => deck.deal({ type: LocationType.EventArea, player }, 3)),
          this.createCards(card => isWonderOrCalamity(card))
        ]
      } else {
        return [this.rules().startRule(RuleId.RollDice)]
      }
    }
    return []
  }

  onRuleEnd() {
    return [
      this.material(MaterialType.AchievementToken)
        .location(l => l.type === LocationType.AchievementsBoard && l.x === 7 && l.y === -3)
        .deleteItemsAtOnce()
    ]
  }
}

function isWonderOrCalamity(card: Card) {
  const type = CardsInfo[card].type
  return type === CardType.Wonder || type === CardType.Calamity
}