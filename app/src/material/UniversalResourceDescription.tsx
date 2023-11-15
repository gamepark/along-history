import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
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

  rules = () => <></>
}

export const universalResourceDescription = new UniversalResourceDescription()