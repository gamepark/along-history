import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { achievementsBoardLocator } from './AchievementsBoardLocator'
import { achievementTokenLocator } from './AchievementTokenLocator'
import { boardTableLocator } from './BoardTableLocator'
import { civilisationAreaLocator } from './CivilisationAreaLocator'
import { coinsStockLocator } from './CoinsStockLocator'
import { deckLocator } from './DeckLocator'
import { discardLocator } from './DiscardLocator'
import { discardTileLocator } from './DiscardTileLocator'
import { eventAreaLocator } from './EventAreaLocator'
import { onCardLocator } from './OnCardLocator'
import { legacyLocator } from './LegacyLocator'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { playerCoinsLocator } from './PlayerCoinsLocator'
import { playerDiscardTileLocator } from './PlayerDiscardTileLocator'
import { playerResourcesLocator } from './PlayerResourcesLocator'
import { playerUniversalResourceLocator } from './PlayerUniversalResourceLocator'
import { resultTokenStockLocator } from './ResultTokenStockLocator'
import { universalResourceStockLocator } from './UniversalResourceStockLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Table]: boardTableLocator,
  [LocationType.Deck]: deckLocator,
  [LocationType.AchievementsBoard]: achievementsBoardLocator,
  [LocationType.DiscardTile]: discardTileLocator,
  [LocationType.ResultTokenStock]: resultTokenStockLocator,
  [LocationType.UniversalResourceStock]: universalResourceStockLocator,
  [LocationType.PlayerUniversalResource]: playerUniversalResourceLocator,
  [LocationType.EventArea]: eventAreaLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.PlayerDiscardTile]: playerDiscardTileLocator,
  [LocationType.PlayerResources]: playerResourcesLocator,
  [LocationType.CivilisationArea]: civilisationAreaLocator,
  [LocationType.AchievementToken]: achievementTokenLocator,
  [LocationType.PlayerAchievements]: playerAchievementsLocator,
  [LocationType.OnCard]: onCardLocator,
  [LocationType.PlayerCoins]: playerCoinsLocator,
  [LocationType.CoinsStock]: coinsStockLocator,
  [LocationType.Legacy]: legacyLocator
}
