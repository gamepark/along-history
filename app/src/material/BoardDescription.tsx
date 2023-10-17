import { LocationType } from '@gamepark/along-history/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import board1 from '../images/board/plateau_recto.jpg'

class AlongHistoryBoardDescription extends BoardDescription {
  image = board1 // TODO: game option & dynamic image
  width = 40.73
  height = 17.23

  staticItem = { location: { type: LocationType.Table } }
  rules = () => <></>
}

export const boardDescription = new AlongHistoryBoardDescription()