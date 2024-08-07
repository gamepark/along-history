import { DiceSymbol } from '@gamepark/along-history/material/DiceSymbol'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItem, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Population1 from '../images/dices/population/Population1.jpg'
import Population2 from '../images/dices/population/Population2.jpg'
import Population3 from '../images/dices/population/Population3.jpg'
import Culture from '../images/dices/resources/Culture.jpg'
import Ingenuity from '../images/dices/resources/Ingenuity.jpg'
import Strength from '../images/dices/resources/Strength.jpg'
import CultureBack from '../images/tokens/resources/CultureBack.jpg'
import Gold3Back from '../images/tokens/resources/Gold3Back.jpg'
import Gold3Front from '../images/tokens/resources/Gold3Front.jpg'
import Gold4Back from '../images/tokens/resources/Gold4Back.jpg'
import Gold4Front from '../images/tokens/resources/Gold4Front.jpg'
import Gold5Back from '../images/tokens/resources/Gold5Back.jpg'
import Gold5Front from '../images/tokens/resources/Gold5Front.jpg'
import Gold6Back from '../images/tokens/resources/Gold6Back.jpg'
import Gold6Front from '../images/tokens/resources/Gold6Front.jpg'
import IngenuityBack from '../images/tokens/resources/IngenuityBack.jpg'
import Population1Back from '../images/tokens/resources/Population1Back.jpg'
import Population2Back from '../images/tokens/resources/Population2Back.jpg'
import Population3Back from '../images/tokens/resources/Population3Back.jpg'
import StrengthBack from '../images/tokens/resources/StrengthBack.jpg'
import { ResultTokenHelp } from './help/ResultTokenHelp'

class ResultTokenDescription extends TokenDescription {
  width = 1.6
  borderRadius = 0.2

  images = {
    [DiceSymbol.Population1]: Population1,
    [DiceSymbol.Population2]: Population2,
    [DiceSymbol.Population3]: Population3,
    [DiceSymbol.Culture]: Culture,
    [DiceSymbol.Ingenuity]: Ingenuity,
    [DiceSymbol.Strength]: Strength,
    [DiceSymbol.Gold3]: Gold3Front,
    [DiceSymbol.Gold4]: Gold4Front,
    [DiceSymbol.Gold5]: Gold5Front,
    [DiceSymbol.Gold6]: Gold6Front
  }

  backImages = {
    [DiceSymbol.Population1]: Population1Back,
    [DiceSymbol.Population2]: Population2Back,
    [DiceSymbol.Population3]: Population3Back,
    [DiceSymbol.Culture]: CultureBack,
    [DiceSymbol.Ingenuity]: IngenuityBack,
    [DiceSymbol.Strength]: StrengthBack,
    [DiceSymbol.Gold3]: Gold3Back,
    [DiceSymbol.Gold4]: Gold4Back,
    [DiceSymbol.Gold5]: Gold5Back,
    [DiceSymbol.Gold6]: Gold6Back
  }

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation
  }

  help = ResultTokenHelp

  canShortClick(move: MaterialMove, { index }: ItemContext) {
    return isMoveItem(move) && move.itemType === MaterialType.ResultToken && index === move.itemIndex
  }
}

export const resultTokenDescription = new ResultTokenDescription()