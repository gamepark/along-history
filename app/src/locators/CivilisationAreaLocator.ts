import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { getRelativePlayerIndex, ItemContext, ItemLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { getPlayerRotation } from './getPlayerRotation'

class CivilisationAreaLocator extends ItemLocator {
    locationDescription = new CivilisationAreaDescription()

    /**
     * Calculate absolute position of the elements inside this area, integrating spaces between cards and decay shifts.
     * @param item
     * @param context
     * @returns
     */
    getPosition(item: MaterialItem, context: ItemContext): Coordinates {
        const previousColumnsContent: Array<number> = []
        ;[...Array(item.location.x).keys()].forEach((column) => {
            previousColumnsContent[column] = context.rules
                .material(MaterialType.Card)
                .player(item.location.player)
                .locationId(item.location.id)
                .location((loc) => loc.type === item.location.type && loc.x === column).length
        })

        const shiftDecay = 1
        const shiftCard = 1
        const playerIndex = getRelativePlayerIndex(context, item.location.player)
        const previousShiftsCount = previousColumnsContent.reduce((acc, colCont) => acc + colCont - 1, 0)
        let originX, originY
        switch (playerIndex) {
            case 0:
                originX = cardDescription.width / 2 - boardDescription.width / 2
                originY = boardDescription.height / 2 + cardDescription.height * 1.5 + 2
                return {
                    x:
                        originX +
                        cardDescription.width * previousColumnsContent.length + //all cards width total
                        shiftCard * previousColumnsContent.length + //shift between each card, total
                        shiftDecay * previousShiftsCount + //previous piles shifts
                        shiftDecay * item.location.z!, //this pile shift
                    y: originY,
                    z: 5 - item.location.z! * 0.1 - item.location.x! * 0.05,
                }
            default:
                originX = boardDescription.width / 2 + cardDescription.height * 1.5 + 2
                originY = boardDescription.height / 2 - cardDescription.width / 2
                return {
                    x: originX,
                    y:
                        originY -
                        cardDescription.width * previousColumnsContent.length - //all cards width total
                        shiftCard * previousColumnsContent.length - //shift between each card, total
                        shiftDecay * previousShiftsCount - //previous piles shifts
                        shiftDecay * item.location.z!, //this pile shift
                    z: 5 - item.location.z! * 0.1 - item.location.x! * 0.05,
                }
        }
    }

    getRotations(item: MaterialItem, context: ItemContext): string[] {
        let rotation = getPlayerRotation(context, item.location.player)
        if (item.location.rotation) {
            rotation += 90
        }
        return [`rotateZ(${rotation}deg)`]
    }
}

class CivilisationAreaDescription extends LocationDescription {
    height = cardDescription.height + 1
    width = boardDescription.width
    borderRadius = cardDescription.borderRadius
    coordinates = {
        x: 0,
        y: boardDescription.height / 2 + cardDescription.height * 1.5 + 2,
        z: 0,
    }

    getLocations({ player }: MaterialContext) {
        return player !== undefined ? [{ type: LocationType.CivilisationArea, player }] : []
    }
}

export const civilisationAreaLocator = new CivilisationAreaLocator()
