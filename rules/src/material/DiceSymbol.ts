import { Bonus } from './cards/Bonus'
import { Resource } from './Resource'

export enum DiceSymbol {
  Population1 = 1,
  Population2,
  Population3,
  Culture,
  Ingenuity,
  Strength,
  GoldenAge,
  Multiplier,
  ReRoll,
  War,
  Gold3,
  Gold4,
  Gold5,
  Gold6,
}

export const isPopulationSymbol = (symbol: DiceSymbol | Resource | Bonus): boolean => symbol <= 3
export const isResource = (symbol: DiceSymbol | Resource | Bonus): symbol is DiceSymbol & Resource => symbol >= 4 && symbol <= 6
