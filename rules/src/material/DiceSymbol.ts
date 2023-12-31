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
  Gold3 = 13,
  Gold4,
  Gold5,
  Gold6,
}

export const isPopulationSymbol = (symbol: DiceSymbol | Resource | Bonus): boolean => symbol <= 3
export const isResource = (symbol: DiceSymbol | Resource | Bonus): symbol is DiceSymbol & Bonus & Resource => symbol >= 4 && symbol <= 6

export const isGold = (symbol: DiceSymbol | Resource | Bonus): symbol is (DiceSymbol | Bonus) => symbol > 10

export const goldAmount = (symbol: DiceSymbol | Bonus) => symbol - 10