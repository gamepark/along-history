import { isEnumValue } from '@gamepark/rules-api'

export enum PlayerColor {
  White = 1, Yellow, Blue, Green, Red
}

export const playerColors = Object.values(PlayerColor).filter(isEnumValue)
