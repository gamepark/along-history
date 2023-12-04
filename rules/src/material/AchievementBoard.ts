import { XYCoordinates } from '@gamepark/rules-api'

export enum AchievementBoard {
  Front = 1, Back
}

export const AchievementBoardLocations = [
  [0], // start column: start location in the middle
  [-3, -1, 1, 3], // column 1
  [-2, 0, 2], // column 2...
  [-3, -1, 1, 3],
  [-2, 0, 2],
  [-3, -1, 1, 3],
  [-2, 0, 2],
  [0]
]

type AchievementsPaths = Record<number, XYCoordinates[]>[]

export const AchievementsFrontPaths: AchievementsPaths = [
  {
    [0]: [{ x: 1, y: -3 }, { x: 1, y: -1 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 3 }]
  },
  {
    [-3]: [{ x: 2, y: -2 }],
    [-1]: [{ x: 2, y: -2 }, { x: 2, y: 0 }],
    [1]: [{ x: 2, y: 2 }],
    [3]: [{ x: 2, y: 2 }, { x: 3, y: 3 }]
  },
  {
    [-2]: [{ x: 3, y: -3 }],
    [0]: [{ x: 3, y: -1 }, { x: 3, y: 1 }],
    [2]: [{ x: 3, y: 1 }]
  },
  {
    [-3]: [{ x: 5, y: -3 }, { x: 4, y: -2 }, { x: 3, y: -1 }],
    [-1]: [{ x: 3, y: -3 }, { x: 4, y: -2 }, { x: 4, y: 0 }, { x: 3, y: 1 }],
    [1]: [{ x: 3, y: -1 }, { x: 4, y: 2 }, { x: 3, y: 3 }],
    [3]: [{ x: 3, y: 1 }, { x: 4, y: 2 }]
  },
  {
    [-2]: [{ x: 5, y: -3 }, { x: 5, y: -1 }],
    [0]: [{ x: 6, y: 0 }, { x: 5, y: 1 }],
    [2]: [{ x: 5, y: 3 }]
  },
  {
    [-3]: [{ x: 6, y: -2 }, { x: 5, y: -1 }],
    [-1]: [{ x: 5, y: -3 }, { x: 6, y: 0 }],
    [1]: [{ x: 6, y: 0 }, { x: 6, y: 2 }, { x: 5, y: 3 }],
    [3]: [{ x: 5, y: 1 }, { x: 6, y: 2 }]
  },
  {
    [-2]: [{ x: 7, y: 0 }],
    [0]: [{ x: 7, y: 0 }],
    [2]: [{ x: 7, y: 0 }]
  },
  { [0]: [] }
]

export const AchievementsBackPaths: AchievementsPaths = [
  {
    [0]: [{ x: 1, y: -3 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: 1, y: 3 }]
  },
  {
    [-3]: [{ x: 3, y: -3 }, { x: 2, y: -2 }],
    [-1]: [{ x: 2, y: -2 }, { x: 2, y: 0 }],
    [1]: [{ x: 2, y: 0 }, { x: 2, y: 2 }],
    [3]: [{ x: 2, y: 2 }, { x: 3, y: 3 }]
  },
  {
    [-2]: [{ x: 3, y: -3 }, { x: 2, y: 0 }],
    [0]: [{ x: 2, y: -2 }, { x: 3, y: -1 }, { x: 3, y: 1 }, { x: 2, y: 2 }],
    [2]: [{ x: 2, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 3 }]
  },
  {
    [-3]: [{ x: 5, y: -3 }, { x: 4, y: -2 }],
    [-1]: [{ x: 4, y: -2 }],
    [1]: [{ x: 4, y: 2 }],
    [3]: [{ x: 4, y: 2 }]
  },
  {
    [-2]: [{ x: 5, y: -3 }, { x: 5, y: -1 }, { x: 4, y: 0 }],
    [0]: [{ x: 4, y: -2 }, { x: 6, y: 0 }, { x: 4, y: 2 }],
    [2]: [{ x: 4, y: 0 }, { x: 5, y: 3 }]
  },
  {
    [-3]: [{ x: 5, y: -1 }],
    [-1]: [{ x: 5, y: -3 }, { x: 6, y: 0 }],
    [1]: [{ x: 6, y: 0 }, { x: 5, y: 3 }],
    [3]: [{ x: 5, y: 1 }, { x: 6, y: 0 }]
  },
  {
    [-2]: [{ x: 7, y: 0 }, { x: 6, y: 0 }],
    [0]: [{ x: 6, y: -2 }, { x: 6, y: 2 }],
    [2]: [{ x: 6, y: 0 }, { x: 7, y: 0 }]
  },
  { [0]: [] }
]

export const AchievementBoardsPath: Record<AchievementBoard, AchievementsPaths> = {
  [AchievementBoard.Front]: AchievementsFrontPaths,
  [AchievementBoard.Back]: AchievementsBackPaths
}
