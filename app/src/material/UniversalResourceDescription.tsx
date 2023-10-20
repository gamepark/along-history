import { TokenDescription } from '@gamepark/react-game'
import UniversalResourceBack from '../images/tokens/resources/UniversalResourceBack.jpg'
import UniversalResourceFront from '../images/tokens/resources/UniversalResourceFront.jpg'

class UniversalResourceDescription extends TokenDescription {
  width = 2.45

  image = UniversalResourceFront
  backImage = UniversalResourceBack

  rules = () => <></>
}

export const universalResourceDescription = new UniversalResourceDescription()