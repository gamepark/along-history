import { isMoveItem, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { AchievementBoardLocations, AchievementsFrontPaths } from '../material/AchievementBoard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class AchievementsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.accessibleTokens.map(token => this.civilizationToken.moveItem(token.location))
  }

  get civilizationToken() {
    return this.material(MaterialType.CivilisationToken).id(this.player)
  }

  get accessibleTokens() {
    const tokens: MaterialItem[] = []
    const civTokenLocation = this.civilizationToken.getItem()!.location as XYCoordinates
    const paths = AchievementsFrontPaths
    const explored: number[][] = AchievementBoardLocations.map(_ => [])
    explored[civTokenLocation.x].push(civTokenLocation.y)
    const available: XYCoordinates[] = [...paths[civTokenLocation.x][civTokenLocation.y]]
    while (available.length) {
      const { x, y } = available.pop()!
      const token = this.material(MaterialType.AchievementToken)
        .location(location => location.type === LocationType.AchievementsBoard && location.x === x && location.y === y)
      if (token.length) {
        tokens.push(token.getItem()!)
      } else {
        available.push(...paths[x][y].filter(space => !explored[space.x].includes(space.y)))
      }
      explored[x].push(y)
    }
    return tokens
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.CivilisationToken) {
      const moves: MaterialMove[] = []
      const { type, x, y } = move.location
      const achievementToken = this.material(MaterialType.AchievementToken).location(location =>
        location.type === type && location.x === x && location.y === y
      )
      if (achievementToken.length) {
        moves.push(achievementToken.moveItem({ type: LocationType.PlayerAchievements, player: this.player, rotation: true }))
      }
      return moves
    }
    return []
  }
}
