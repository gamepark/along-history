import { LocationType } from '@gamepark/along-history/material/LocationType';
import { MaterialType } from '@gamepark/along-history/material/MaterialType';
import { getRelativePlayerIndex, ItemContext, LineLocator, LocationDescription, MaterialContext } from '@gamepark/react-game';
import { Coordinates, MaterialItem } from '@gamepark/rules-api';
import { boardDescription } from '../material/BoardDescription';
import { cardDescription } from '../material/CardDescription';
import { getPlayerRotation } from './getPlayerRotation';

class CivilisationAreaLocator extends LineLocator {
	locationDescription = new CivilisationAreaDescription();

	getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
		const playerIndex = getRelativePlayerIndex(context, item.location.player);
		switch (playerIndex) {
			case 0:
				return {
					x: cardDescription.width / 2 - boardDescription.width / 2,
					y: boardDescription.height / 2 + cardDescription.height * 1.5 + 2,
					//z: item.location.z!  * 0.1 * -1,
					z: 5 - item.location.z! * 0.1 - item.location.x! * 0.05,
				};
			default:
				return {
					x: boardDescription.width / 2 + cardDescription.height * 1.5 + 2,
					y: boardDescription.height / 2 - cardDescription.width / 2,
					z: 5 - item.location.x! * 0.1,
				};
		}
	}

	getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
		const playerIndex = getRelativePlayerIndex(context, item.location.player);
		const shiftDecay = 1.5;
		const previousPile = context.rules
			.material(MaterialType.Card)
			.player(item.location.player)
      .locationId(item.location.id)
			.location((loc) => loc.type===item.location.type&& loc.x === (item.location.x! -1));

      console.log("add item" ,item.id["front"] ,item);
      console.log("previous pile", previousPile.getItems())

    const previousPileShifts=Math.max(previousPile.length-1, 0) //-1 because the fist card is not shifted
		switch (playerIndex) {
			case 0:
        console.log(item.location.z, "cardDescription.width + 1 :",cardDescription.width + 1 , "shiftDecay * item.location.z",shiftDecay * item.location.z!)
				const modified =  item.location.z === 0 ? { x: cardDescription.width + 1 + (shiftDecay * (previousPileShifts))} : { x: cardDescription.width + 1 +shiftDecay * item.location.z! };// 2 * item.location.z! //cardDescription.width + 1+ shiftDecay * previousPileLength
        console.log("pile length en ",item.location.x! -1,"=",previousPileShifts, modified);
        return modified;
			default:
				return { y: -cardDescription.width - 1 };
		}
	}

	getRotations(item: MaterialItem, context: ItemContext): string[] {
		let rotation = getPlayerRotation(context, item.location.player);
		if (item.location.rotation) {
			rotation += 90;
		}
		return [`rotateZ(${rotation}deg)`];
	}
}

class CivilisationAreaDescription extends LocationDescription {
	height = cardDescription.height + 1;
	width = boardDescription.width;
	borderRadius = cardDescription.borderRadius;
	coordinates = {
		x: 0,
		y: boardDescription.height / 2 + cardDescription.height * 1.5 + 2,
		z: 0,
	};

	getLocations({ player }: MaterialContext) {
		return player !== undefined ? [{ type: LocationType.CivilisationArea, player }] : [];
	}
}

export const civilisationAreaLocator = new CivilisationAreaLocator();
