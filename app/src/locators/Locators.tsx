import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { achievementsBoardLocator } from './AchievementsBoardLocator'
import { deckLocator } from './DeckLocator'
import { discardTileLocator } from './DiscardTileLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Deck]: deckLocator,
  [LocationType.AchievementsBoard]: achievementsBoardLocator,
  [LocationType.DiscardTile]: discardTileLocator
}
