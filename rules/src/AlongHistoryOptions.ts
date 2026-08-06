import { getEnumValues, OptionsSpecV2 } from '@gamepark/rules-api'
import { AchievementBoard } from './material/AchievementBoard'
import { PlayerColor, playerColors } from './PlayerColor'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type AlongHistoryOptions = {
  players: PlayerOptions[]
  board?: AchievementBoard
  ages?: AgesOption
}

export enum AgesOption {
  Prehistory = 1, Antiquity, MiddleAges, PrehistoryToAntiquity, AntiquityToMiddleAges, PrehistoryToMiddleAges
}

/**
 * The option space of along-history: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the subscription gates and the competitive settings went.
 */
export const AlongHistoryOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 5 },
  identities: { values: playerColors },
  options: {
    board: { kind: 'enum', values: [AchievementBoard.Front, AchievementBoard.Back] },
    ages: { kind: 'enum', values: getEnumValues(AgesOption) }
  }
}

export function getPlayerName(playerId: PlayerColor, t: (key: string) => string) {
  switch (playerId) {
    case PlayerColor.White:
      return t('White')
    case PlayerColor.Yellow:
      return t('Yellow')
    case PlayerColor.Blue:
      return t('Blue')
    case PlayerColor.Green:
      return t('Green')
    case PlayerColor.Red:
      return t('Red')
  }
}