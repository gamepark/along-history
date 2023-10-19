import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { boardDescription } from './BoardDescription'
import { cardDescription } from './CardDescription'
import { civilisationTokenDescription } from './CivilisationTokenDescription'
import { diceDescription } from './DiceDescription'
import { resultTokenDescription } from './ResultTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: cardDescription,
  [MaterialType.CivilisationToken]: civilisationTokenDescription,
  [MaterialType.Dice]: diceDescription,
  [MaterialType.ResultToken]: resultTokenDescription
}
