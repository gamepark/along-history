import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { XYCoordinates } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

export enum Orientation {
  LEFT_RIGHT, TOP_BOTTOM, RIGHT_LEFT, BOTTOM_TOP
}

type Area = {
  width: number
} & XYCoordinates

export type PlayerLocation = {
  orientation: Orientation
  eventArea: Area
  civilisationArea: Area
}

export function getPlayerLocation(player: PlayerColor, context: MaterialContext) {
  const index = getRelativePlayerIndex(context, player)
  switch (context.rules.players.length) {
    case 2:
      return playersLocationAt2Players[index]
    case 3:
      return playersLocationAt3Players[index]
    case 4:
      return playersLocationAt4Players[index]
    default:
      return playersLocationAt5Players[index]
  }
}

export const civilisationAreaHeight = 13
export const civilisationAreaWidth = civilisationAreaHeight + cardDescription.height * 2 + boardDescription.height + 3

const playersLocationAt5Players: PlayerLocation[] = [
  {
    orientation: Orientation.LEFT_RIGHT,
    eventArea: {
      width: boardDescription.width,
      x: 0,
      y: boardDescription.height + 1
    },
    civilisationArea: {
      width: civilisationAreaWidth * 2 - civilisationAreaHeight * 2 - cardDescription.height * 2 - 3,
      x: 0,
      y: boardDescription.height + cardDescription.height + 2
    }
  },
  {
    orientation: Orientation.TOP_BOTTOM,
    eventArea: {
      width: civilisationAreaWidth - cardDescription.height - 1,
      x: -1,
      y: 0
    },
    civilisationArea: {
      width: civilisationAreaWidth,
      x: -cardDescription.height - 2,
      y: -cardDescription.height - 1
    }
  },
  {
    orientation: Orientation.RIGHT_LEFT,
    eventArea: {
      width: civilisationAreaWidth - civilisationAreaHeight - 1,
      x: civilisationAreaWidth - civilisationAreaHeight - cardDescription.height - 2,
      y: -1
    },
    civilisationArea: {
      width: civilisationAreaWidth,
      x: civilisationAreaWidth - civilisationAreaHeight - cardDescription.height - 2,
      y: -cardDescription.height - 2
    }
  },
  {
    orientation: Orientation.RIGHT_LEFT,
    eventArea: {
      width: civilisationAreaWidth - civilisationAreaHeight - 1,
      x: civilisationAreaWidth * 2 - civilisationAreaHeight * 2 - cardDescription.height - 2,
      y: -1
    },
    civilisationArea: {
      width: civilisationAreaWidth,
      x: civilisationAreaWidth * 2 - civilisationAreaHeight - cardDescription.height - 1,
      y: -cardDescription.height - 2
    }
  },
  {
    orientation: Orientation.BOTTOM_TOP,
    eventArea: {
      width: civilisationAreaWidth - cardDescription.height - 1,
      x: civilisationAreaWidth * 2 - civilisationAreaHeight * 2 - cardDescription.height * 2 - 2,
      y: boardDescription.height + cardDescription.height + civilisationAreaHeight + 2
    },
    civilisationArea: {
      width: civilisationAreaWidth,
      x: civilisationAreaWidth * 2 - civilisationAreaHeight * 2 - cardDescription.height - 1,
      y: boardDescription.height + cardDescription.height + civilisationAreaHeight + 2
    }
  }
]

const playersLocationAt4Players: PlayerLocation[] = playersLocationAt5Players

const playersLocationAt3Players: PlayerLocation[] = playersLocationAt5Players

const playersLocationAt2Players: PlayerLocation[] = playersLocationAt5Players