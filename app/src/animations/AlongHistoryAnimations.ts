import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { CardAnimations } from './CardAnimations'
import { DiceAnimations } from './DiceAnimations'
import { ResultTokenAnimations } from './ResultTokenAnimations'
import { UniversalResourceAnimations } from './UniversalResourceAnimations'

export class AlongHistoryAnimations extends MaterialGameAnimations {
  itemsAnimations = {
    [MaterialType.Dice]: new DiceAnimations(),
    [MaterialType.Card]: new CardAnimations(),
    [MaterialType.UniversalResource]: new UniversalResourceAnimations(),
    [MaterialType.ResultToken]: new ResultTokenAnimations()
  }
}