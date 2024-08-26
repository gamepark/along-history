import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { achievementsBoardLocator } from './AchievementsBoardLocator'
import { civilisationAreaLocator } from './CivilisationAreaLocator'
import { coinsStockLocator } from './CoinsStockLocator'
import { deckLocator } from './DeckLocator'
import { discardLocator } from './DiscardLocator'
import { discardTileLocator } from './DiscardTileLocator'
import { eventAreaLocator } from './EventAreaLocator'
import { legacyLocator } from './LegacyLocator'
import { onCardLocator } from './OnCardLocator'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { playerCoinsLocator } from './PlayerCoinsLocator'
import { playerDiscardTileLocator } from './PlayerDiscardTileLocator'
import { playerResourcesLocator } from './PlayerResourcesLocator'
import { playerUniversalResourceLocator } from './PlayerUniversalResourceLocator'
import { resultTokenStockLocator } from './ResultTokenStockLocator'
import { universalResourceStockLocator } from './UniversalResourceStockLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Table]: new Locator({ coordinates: { x: boardDescription.width / 2, y: boardDescription.height / 2 } }),
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
  [LocationType.PlayerAchievements]: playerAchievementsLocator,
  [LocationType.OnCard]: onCardLocator,
  [LocationType.PlayerCoins]: playerCoinsLocator,
  [LocationType.CoinsStock]: coinsStockLocator,
  [LocationType.Legacy]: legacyLocator
}
