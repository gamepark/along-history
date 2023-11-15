import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItem, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import UniversalResourceBack from '../images/tokens/resources/UniversalResourceBack.jpg'
import UniversalResourceFront from '../images/tokens/resources/UniversalResourceFront.jpg'
import { getPlayerRotation } from '../locators/PlayerLocator'

class UniversalResourceDescription extends TokenDescription {
  width = 2.45

  image = UniversalResourceFront
  backImage = UniversalResourceBack

  isFlipped() {
    return false
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context) + 45
  }

  canShortClick(move: MaterialMove, { index }: ItemContext) {
    return isMoveItem(move) && move.itemType === MaterialType.UniversalResource && index === move.itemIndex
  }

  rules = () => <></>
}

export const universalResourceDescription = new UniversalResourceDescription()