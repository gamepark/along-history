import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  White = 1, Yellow, Blue, Green, Red
}

export const playerColors = getEnumValues(PlayerColor)
