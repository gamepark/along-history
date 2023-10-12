import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { alongHistoryBoardDescription } from './AlongHistoryBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Board]: alongHistoryBoardDescription
}
