import { DiceType, GoldDice, PopulationDice, ResourceDice, SpecialDice } from '@gamepark/along-history/material/Dices'
import { DiceSymbol } from '@gamepark/along-history/material/DiceSymbol'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { CubicDiceDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
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
import { getPlayerLocation, Orientation } from '../locators/PlayerLocator'
import { DiceHelp } from './help/DiceHelp'

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
    [DiceSymbol.ReRoll]: Reroll,
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

  getRotations(item: MaterialItem, context: ItemContext) {
    const player = item.location.player ?? context.rules.material(MaterialType.DiscardTile).getItem()!.location.player!
    const playerLocation = getPlayerLocation(player, context)
    const rotations: string[] = []
    if (item.location.player && playerLocation.orientation) {
      rotations.push(`rotateZ(${playerLocation.orientation * 90}deg)`)
    }
    rotations.push(this.getPerspective(playerLocation.orientation))
    rotations.push(...super.getRotations(item, context))
    return rotations
  }

  getPerspective(orientation: Orientation) {
    switch (orientation) {
      case Orientation.LEFT_RIGHT:
        return 'rotate3d(1, -1, 0, 15deg)'
      case Orientation.TOP_BOTTOM:
        return 'rotate3d(-1, -1, 0, 15deg)'
      case Orientation.RIGHT_LEFT:
        return 'rotate3d(-1, 1, 0, 15deg)'
      case Orientation.BOTTOM_TOP:
        return 'rotate3d(1, 1, 0, 15deg)'
    }
  }

  canShortClick(move: MaterialMove, context: ItemContext) {
    if (context.rules.game.rule?.id === RuleId.UseGoldDie) return false
    return super.canShortClick(move, context)
      || (isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === context.index && move.location.type === LocationType.DiscardTile)
  }

  help = DiceHelp
}

export const diceDescription = new DiceDescription()