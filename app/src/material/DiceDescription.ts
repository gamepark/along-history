import { DiceType } from '@gamepark/along-history/material/Dice'
import { CubicDiceDescription } from '@gamepark/react-game'
import Gold3 from '../images/dices/gold/Gold3.jpg'
import Gold4 from '../images/dices/gold/Gold4.jpg'
import Gold5 from '../images/dices/gold/Gold5.jpg'
import Gold6 from '../images/dices/gold/Gold6.jpg'
import Population1 from '../images/dices/population/Population1.jpg'
import Population2 from '../images/dices/population/Population2.jpg'
import Population3 from '../images/dices/population/Population3.jpg'
import Culture from '../images/dices/resources/Culture.jpg'
import Ingenuity from '../images/dices/resources/Ingenuity.jpg'
import Strength from '../images/dices/resources/Strength.jpg'
import GoldenAge from '../images/dices/special/GoldenAge.jpg'
import Multiplier from '../images/dices/special/Multiplier.jpg'
import Reroll from '../images/dices/special/Reroll.jpg'
import War from '../images/dices/special/War.jpg'

class DiceDescription extends CubicDiceDescription {

  images = {
    [DiceType.Population]: [Population1, Population1, Population1, Population2, Population2, Population3],
    [DiceType.Resource]: [Culture, Culture, Ingenuity, Ingenuity, Strength, Strength],
    [DiceType.Special]: [GoldenAge, GoldenAge, Multiplier, Reroll, Reroll, War],
    [DiceType.Gold]: [Gold3, Gold3, Gold3, Gold4, Gold5, Gold6],
  }

  getColor(diceType: DiceType) {
    switch (diceType) {
      case DiceType.Population:
        return '#446241'
      case DiceType.Resource:
        return '#466672'
      case DiceType.Special:
        return '#b5050e'
      case DiceType.Gold:
        return '#222222'
    }
  }
}

export const diceDescription = new DiceDescription()