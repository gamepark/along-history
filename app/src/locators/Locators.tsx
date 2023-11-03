import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { achievementsBoardLocator } from './AchievementsBoardLocator'
import { achievementTokenLocator } from './AchievementTokenLocator'
import { civilisationAreaLocator } from './CivilisationAreaLocator'
import { deckLocator } from './DeckLocator'
import { discardTileLocator } from './DiscardTileLocator'
import { eventAreaLocator } from './EventAreaLocator'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { playerResourcesLocator } from './PlayerResourcesLocator'
import { playerDiscardTileLocator } from './PlayerDiscardTileLocator'
import { playerUniversalResourceLocator } from './PlayerUniversalResourceLocator'
import { resultTokenStockLocator } from './ResultTokenStockLocator'
import { universalResourceStockLocator } from './UniversalResourceStockLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Deck]: deckLocator,
  [LocationType.AchievementsBoard]: achievementsBoardLocator,
  [LocationType.DiscardTile]: discardTileLocator,
  [LocationType.ResultTokenStock]: resultTokenStockLocator,
  [LocationType.UniversalResourceStock]: universalResourceStockLocator,
  [LocationType.PlayerUniversalResource]: playerUniversalResourceLocator,
  [LocationType.EventArea]: eventAreaLocator,
  [LocationType.PlayerDiscardTile]: playerDiscardTileLocator,
  [LocationType.PlayerResources]: playerResourcesLocator,
  [LocationType.CivilisationArea]: civilisationAreaLocator,
  [LocationType.AchievementToken]: achievementTokenLocator,
  [LocationType.PlayerAchievements]: playerAchievementsLocator
}
