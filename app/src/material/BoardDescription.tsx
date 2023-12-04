import { AchievementBoard, AchievementBoardLocations } from '@gamepark/along-history/material/AchievementBoard'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import BoardBack from '../images/board/BoardBack.jpg'
import BoardFront from '../images/board/BoardFront.jpg'
import { BoardHelp } from './help/BoardHelp'

class AlongHistoryBoardDescription extends BoardDescription {
  images = {
    [AchievementBoard.Front]: BoardFront,
    [AchievementBoard.Back]: BoardBack
  }
  width = 41.826
  height = 18.78

  protected getFrontId(_itemId: never, { rules }: MaterialContext): AchievementBoard {
    return rules.remind<AchievementBoard | undefined>(Memory.Board) ?? AchievementBoard.Front
  }

  staticItem = { location: { type: LocationType.Table } }
  help = BoardHelp

  locations = AchievementBoardLocations.flatMap((columns, x) => columns.map(y => ({ type: LocationType.AchievementsBoard, x, y })))
}

export const boardDescription = new AlongHistoryBoardDescription()