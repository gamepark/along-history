import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, MaterialContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItem, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import UniversalResourceBack from '../images/tokens/resources/UniversalResourceBack.jpg'
import UniversalResourceFront from '../images/tokens/resources/UniversalResourceFront.jpg'
import { getPlayerRotation } from '../locators/PlayerLocator'
import { UniversalResourceHelp } from './help/UniversalResourceHelp'

class UniversalResourceDescription extends TokenDescription {
  width = 2.45

  image = UniversalResourceFront
  backImage = UniversalResourceBack

  randomFlipCache: Map<number, { location?: LocationType, flipped: boolean }> = new Map()

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext) {
    const index = ((context as ItemContext).index ?? 0) * 10 + ((context as ItemContext).displayIndex ?? 0)
    if (this.randomFlipCache.get(index)?.location !== item.location?.type) {
      this.randomFlipCache.set(index, { location: item.location?.type, flipped: Math.random() < 0.5 })
    }
    return this.randomFlipCache.get(index)?.flipped === true
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context) + 45
  }

  canShortClick(move: MaterialMove, { index }: ItemContext) {
    return isMoveItem(move) && move.itemType === MaterialType.UniversalResource && index === move.itemIndex
  }

  help = UniversalResourceHelp
}

export const universalResourceDescription = new UniversalResourceDescription()