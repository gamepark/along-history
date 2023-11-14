import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialMove, isMoveItem } from '@gamepark/rules-api'
import { shallowEqual } from 'react-redux'
import { cardDescription } from '../material/CardDescription'

class OnCardLocator extends ItemLocator {
    parentItemType = MaterialType.Card
    positionOnParent = { x: 50, y: 50 }
    locationDescription = new OnCardLocationDescription()
}

class OnCardLocationDescription extends LocationDescription {
    width = cardDescription.width
    height = cardDescription.height
    borderRadius = cardDescription.borderRadius

    isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): boolean {
        if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea && move.location.x !== undefined) {
            const card = context.rules.material(MaterialType.Card).getItem(location.parent!)
            return shallowEqual(card!.location, move.location)
        }
        return false
    }
}

export const onCardLocator = new OnCardLocator()
