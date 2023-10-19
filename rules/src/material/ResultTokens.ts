import { DiceSymbol } from './DiceSymbol'

export const ResultTokens: Partial<Record<DiceSymbol, number>> = {
  [DiceSymbol.Population1]: 3,
  [DiceSymbol.Population2]: 3,
  [DiceSymbol.Population3]: 3,
  [DiceSymbol.Culture]: 1,
  [DiceSymbol.Ingenuity]: 1,
  [DiceSymbol.Strength]: 1
}