import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { deckLocator } from './DeckLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Deck]: deckLocator
}
