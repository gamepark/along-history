import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'

export function getPlayerRotation(context: MaterialContext, player?: number) {
  const playerIndex = getRelativePlayerIndex(context, player)
  return playerIndex === 0 ? 0 : -90
}

export function getDicePerspective(context: MaterialContext) {
  switch (getPlayerRotation(context, context.rules.material(MaterialType.DiscardTile).getItem()?.location.player)) {
    case -90:
      return 'rotate3d(1, 1, 0, 15deg)'
    default:
      return 'rotate3d(1, -1, 0, 15deg)'
  }
}