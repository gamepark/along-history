import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api';

/**
 * This strategy uses a consecutive sequence of numbers starting with 0 for items at the same location according to the axis, and allows several elements to be at the same position but with another sequence for depth (Z)
 */
export class CivilisationAreaStrategy<P extends number = number, M extends number = number, L extends number = number> implements LocationStrategy<P, M, L> {
	axis: 'x' | 'y' | 'z';

	constructor(axis: 'x' | 'y' | 'z' = 'x') {
		this.axis = axis;
	}

	/**
	 *
	 * @param material contains all other elements at the same place, before actually adding the item
	 * @param item
	 */
	addItem(material: Material<P, M, L>, item: MaterialItem<P, L>): void {
		console.log('addItems start', item.id, item.location);
		const x = item.location[this.axis];
		if (x === undefined) {
			item.location[this.axis] = new Set(material.getItems().map((item) => item.location.x)).size;
			item.location['z'] = 0;
		}

		if (material.location((loc) => loc.x === x).length !== 0) {
			//we’re adding a card under the first one, which never moves. Under this first one, it’s a regular pile
			//so this card becomes the first of the pile under, and everything in this pile needs to be shifted
			item.location['z'] = 1;
			const pileInZOrder = material.location((loc) => loc.x === x).sort((item) => item.location['z']!);
			for (const item of pileInZOrder.getItems()) {
				const itemZ = item.location['z'];
				if (itemZ !== undefined && itemZ >= 1) {
					item.location['z']!++;
				}
			}
		}
		console.log('addItem end', item.id, item.location);
		//increments depth for everything and add the new one at 1
		//item.location['z'] = material.location((loc) => loc.x === x).length;
	}

	/**
	 *
	 * @param material contains all the elements at the same place, including the item to be removed
	 * @param item
	 * @returns
	 */
	/* When an item is removed, if  it was the only one in its pile, items after it are shifted minus.
		If it wasn’t the only one, then all remaining elements in its pile are shifted and reranged from 0.
	*/
	removeItem(material: Material<P, M, L>, item: MaterialItem<P, L>): void {
		const x = item.location[this.axis];
		if (x === undefined) return;

		const remainingItemsInPile = material.location((loc) => loc.x === x && loc.z !== item.location.z).sort((item) => item.location['z']!);
		if (remainingItemsInPile.length > 0) {
			console.log('not alone in its pile');
			for (const [i, item] of remainingItemsInPile.getItems().entries()) {
				item.location['z'] = i;
			}
		} else {
			console.log('Alone in its pile');
			for (const item of material.getItems()) {
				const itemX = item.location[this.axis];
				if (itemX !== undefined && itemX > x) {
					console.log(item.id, item.location[this.axis],"->",item.location[this.axis]!-1)
					item.location[this.axis]!--;
				}
			}
		}
	}
}
