import { getEnumValues } from '@gamepark/rules-api'

export enum CardType {
  Land = 1, Figure, Progress, Wonder, Calamity
}

export const cardTypes = getEnumValues(CardType)
