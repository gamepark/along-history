import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'

export class CivilisationAreaStrategy implements LocationStrategy {
  addItem(material: Material, item: MaterialItem) {
    if (item.location.x === undefined) {
      item.location.x = new Set(material.getItems().map(item => item.location.x)).size
      item.location.z = 0
    }
  }

  moveItem(material: Material, item: MaterialItem, index: number) {
    if (item.location.z === 0) return
    const xBefore = material.getItem(index)!.location.x!
    const cardsToMove = material.location(location => location.x === xBefore).getItems()
    const cardsToPutBehind = material.location(location => location.x === item.location.x && location.z! > 0).getItems()
    for (const card of cardsToPutBehind) {
      card.location.z! += cardsToMove.length
    }
    for (const itemToMove of cardsToMove) {
      itemToMove.location.x = item.location.x
      itemToMove.location.z!++
    }
    if (item.location.x! > xBefore) {
      item.location.x!--
    }
    const cardsToReindex = material.location(location => location.x! > xBefore).getItems()
    for (const card of cardsToReindex) {
      card.location.x!--
    }
  }

  /**
   * When an item is removed, if  it was the only one in its pile, items after it are shifted minus.
   * If it was not the only one, then all remaining elements in its pile are shifted and restarts from 0.
   */
  removeItem(material: Material, item: MaterialItem) {
    const x = item.location.x!
    const z = item.location.z!
    if (material.location(l => l.x === x && l.z === z)) return // card was just traded
    const cardsInPile = material.location(location => location.x === x).getItems()
    if (cardsInPile.length > 0) {
      for (const card of cardsInPile) {
        card.location.z!--
      }
    } else {
      const cardsToReindex = material.location(location => location.x! > x).getItems()
      for (const card of cardsToReindex) {
        card.location.x!--
      }
    }
  }
}
