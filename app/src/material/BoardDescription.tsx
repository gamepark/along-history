import { AchievementBoard, AchievementBoardLocations } from '@gamepark/along-history/material/AchievementBoard'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import BoardBack from '../images/board/BoardBack.jpg'
import BoardFront from '../images/board/BoardFront.jpg'
import { BoardHelp } from './help/BoardHelp'

class AlongHistoryBoardDescription extends BoardDescription {
  image = BoardFront
  backImage = BoardBack
  width = 41.826
  height = 18.78

  isFlipped(_item: Partial<MaterialItem>, { rules }: MaterialContext) {
    return rules.remind<AchievementBoard | undefined>(Memory.Board) === AchievementBoard.Back
  }

  staticItem = { location: { type: LocationType.Table } }
  help = BoardHelp

  locations = AchievementBoardLocations.flatMap((columns, x) => columns.map(y => ({ type: LocationType.AchievementsBoard, x, y })))
}

export const boardDescription = new AlongHistoryBoardDescription()