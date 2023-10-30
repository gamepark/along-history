import { DiceType, GoldDice, PopulationDice, ResourceDice, SpecialDice } from '@gamepark/along-history/material/Dices'
import { DiceSymbol } from '@gamepark/along-history/material/DiceSymbol'
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
    [DiceSymbol.Population1]: Population1,
    [DiceSymbol.Population2]: Population2,
    [DiceSymbol.Population3]: Population3,
    [DiceSymbol.Culture]: Culture,
    [DiceSymbol.Ingenuity]: Ingenuity,
    [DiceSymbol.Strength]: Strength,
    [DiceSymbol.GoldenAge]: GoldenAge,
    [DiceSymbol.Multiplier]: Multiplier,
    [DiceSymbol.Reroll]: Reroll,
    [DiceSymbol.War]: War,
    [DiceSymbol.Gold3]: Gold3,
    [DiceSymbol.Gold4]: Gold4,
    [DiceSymbol.Gold5]: Gold5,
    [DiceSymbol.Gold6]: Gold6
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

  getSideId(index: number, diceType: DiceType) {
    switch (diceType) {
      case DiceType.Population:
        return PopulationDice[index]
      case DiceType.Resource:
        return ResourceDice[index]
      case DiceType.Special:
        return SpecialDice[index]
      case DiceType.Gold:
        return GoldDice[index]
    }
  }
}

export const diceDescription = new DiceDescription()