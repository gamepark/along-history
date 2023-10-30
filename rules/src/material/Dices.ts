import { MaterialItem } from '../../../../workshop/packages/rules-api'
import { DiceSymbol } from './DiceSymbol'

export enum DiceType {
  Population = 1,
  Resource,
  Special,
  Gold
}

export const DiceCount: Record<DiceType, number> = {
  [DiceType.Population]: 3,
  [DiceType.Resource]: 1,
  [DiceType.Special]: 2,
  [DiceType.Gold]: 1,
}

export const PopulationDice = [
  DiceSymbol.Population1,
  DiceSymbol.Population1,
  DiceSymbol.Population1,
  DiceSymbol.Population2,
  DiceSymbol.Population2,
  DiceSymbol.Population3
]

export const ResourceDice = [
  DiceSymbol.Culture,
  DiceSymbol.Ingenuity,
  DiceSymbol.Strength,
  DiceSymbol.Strength,
  DiceSymbol.Ingenuity,
  DiceSymbol.Culture
]

export const SpecialDice = [
  DiceSymbol.GoldenAge,
  DiceSymbol.Reroll,
  DiceSymbol.Multiplier,
  DiceSymbol.War,
  DiceSymbol.Reroll,
  DiceSymbol.GoldenAge
]

export const GoldDice = [
  DiceSymbol.Gold3,
  DiceSymbol.Gold3,
  DiceSymbol.Gold3,
  DiceSymbol.Gold4,
  DiceSymbol.Gold5,
  DiceSymbol.Gold6
]

export const Dices: Record<DiceType, DiceSymbol[]> = {
  [DiceType.Population]: PopulationDice,
  [DiceType.Resource]: ResourceDice,
  [DiceType.Special]: SpecialDice,
  [DiceType.Gold]: GoldDice
}

export const getDiceSymbol = (dice: MaterialItem): DiceSymbol => Dices[dice.id][dice.location.rotation]
