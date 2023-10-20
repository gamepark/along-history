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