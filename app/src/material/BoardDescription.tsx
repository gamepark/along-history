import { AchievementBoard, AchievementBoardLocations } from '@gamepark/along-history/material/AchievementBoard'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import BoardBack from '../images/board/BoardBack.jpg'
import BoardFront from '../images/board/BoardFront.jpg'
import { BoardHelp } from './help/BoardHelp'

class AlongHistoryBoardDescription extends BoardDescription {
  width = 41.826
  height = 18.78
  
  images = {
    [AchievementBoard.Front]: BoardFront,
    [AchievementBoard.Back]: BoardBack
  }

  frontBoard = { id: AchievementBoard.Front, location: { type: LocationType.Table } }
  backBoard = { id: AchievementBoard.Back, location: { type: LocationType.Table } }

  getStaticItems({ rules }: MaterialContext) {
    return [rules.remind(Memory.Board) === AchievementBoard.Back ? this.backBoard : this.frontBoard]
  }

  help = BoardHelp

  locations = AchievementBoardLocations.flatMap((columns, x) => columns.map(y => ({ type: LocationType.AchievementsBoard, x, y })))
}

export const boardDescription = new AlongHistoryBoardDescription()