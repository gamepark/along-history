import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const AlongHistoryOptionsSpec: OptionsSpec<AlongHistoryOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: playerColors,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  },
  board: {
    label: (t: TFunction) => t('board.option'),
    values: [AchievementBoard.Front, AchievementBoard.Back],
    valueSpec: board => ({ label: t => t(`board.${board}`), help: t => t(`board.${board}.help`) })
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
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