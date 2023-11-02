import { AchievementBoardLocations } from '@gamepark/along-history/material/AchievementBoard'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import board1 from '../images/board/BoardFront.jpg'

class AlongHistoryBoardDescription extends BoardDescription {
  image = board1 // TODO: game option & dynamic image
  width = 39.95
  height = 17.625

  staticItem = { location: { type: LocationType.Table } }
  rules = () => <></>

  locations = AchievementBoardLocations.flatMap((columns, x) => columns.map(y => ({ type: LocationType.AchievementsBoard, x, y })))
}

export const boardDescription = new AlongHistoryBoardDescription()