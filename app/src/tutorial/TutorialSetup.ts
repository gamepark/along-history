import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { Card } from '@gamepark/along-history/material/Card'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { isShuffle, MaterialMove, RollItem } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'

export class TutorialSetup extends AlongHistorySetup {
  Rules = TutorialRandomizerRule
}

class TutorialRandomizerRule extends AlongHistoryRules {
  randomize(move: MaterialMove) {
    if (isShuffle(move)) {
      if (move.itemType === MaterialType.Card) {
        const topCards = this.material(MaterialType.Card).location(LocationType.EventArea).length === 0 ?
          [Card.Forest, Card.Swamp, Card.Tiger, Card.River, Card.Hunting, Card.HomoErectus, Card.Wildcrafting, Card.Fishing, Card.Mammoth]
          : [Card.Australopithecus, Card.Hills, Card.Megaliths, Card.FuneralRites, Card.Mountain, Card.Wolves]
        const newIndexes = this.putCardsOnTop(topCards, move.indexes)
        return { ...move, newIndexes }
      }
    }
    return super.randomize(move)
  }

  roll(move: RollItem) {
    switch (move.itemIndex) {
      case 0:
        return 3
      case 1:
        return 0
      case 2:
        return 4
      case 3:
        return 2
      case 4:
        return 2
      case 5:
        return 5
      default:
        return super.roll(move)
    }
  }

  putCardsOnTop(cards: Card[], indexes: number[]) {
    const result = shuffle(indexes)
    const expectedIndexes = this.material(MaterialType.Card).indexes(indexes).sort(item => item.location.x!).getIndexes()
    for (const card of cards) {
      const index = indexes.findIndex(i => this.material(MaterialType.Card).getItem<CardId>(i)?.id?.front === card)
      const expectedNewIndex = expectedIndexes.pop()!
      if (expectedNewIndex !== result[index]) {
        result[result.indexOf(expectedNewIndex)] = result[index]
        result[index] = expectedNewIndex
      }
    }
    return result
  }
}
