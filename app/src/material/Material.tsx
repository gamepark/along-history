import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { boardDescription } from './BoardDescription'
import { cardDescription } from './CardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: cardDescription
}
