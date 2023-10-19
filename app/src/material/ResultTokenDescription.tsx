import { DiceSymbol } from '@gamepark/along-history/material/DiceSymbol'
import { TokenDescription } from '@gamepark/react-game'
import Population1 from '../images/dices/population/Population1.jpg'
import Population2 from '../images/dices/population/Population2.jpg'
import Population3 from '../images/dices/population/Population3.jpg'
import Culture from '../images/dices/resources/Culture.jpg'
import Ingenuity from '../images/dices/resources/Ingenuity.jpg'
import Strength from '../images/dices/resources/Strength.jpg'

class ResultTokenDescription extends TokenDescription {
  width = 1.6
  borderRadius = 0.2

  images = {
    [DiceSymbol.Population1]: Population1,
    [DiceSymbol.Population2]: Population2,
    [DiceSymbol.Population3]: Population3,
    [DiceSymbol.Culture]: Culture,
    [DiceSymbol.Ingenuity]: Ingenuity,
    [DiceSymbol.Strength]: Strength
  }

  rules = () => <></>
}

export const resultTokenDescription = new ResultTokenDescription()