import { isCreateItemsAtOnce, isShuffle, ItemMove, listingToList, MaterialItem, PlayerTurnRule } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
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
    return this.material(MaterialType.AchievementToken).createItemsAtOnce(this.getRandomAchievements(age))
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

  getRandomAchievements(age: Age): MaterialItem[] {
    const items: MaterialItem[] = []
    for (let x = 1; x < AchievementBoardLocations.length; x++) {
      const tokens = shuffle(achievements.filter(achievement =>
        getAchievementValue(achievement) === x && (achievement !== Achievement.Gold15 || age !== Age.Prehistory)
      ))
      for (const y of AchievementBoardLocations[x]) {
        items.push({ id: tokens.pop(), location: { type: LocationType.AchievementsBoard, x, y } })
      }
    }
    return items
  }

  afterItemMove(move: ItemMove) {
    if (move.itemType === MaterialType.Card) {
      return this.afterCardMove(move)
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