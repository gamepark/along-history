import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'

export class FillGapZOnlyStrategy implements LocationStrategy {
  moveItem(material: Material, item: MaterialItem) {
    const items = material.location(l => l.x === item.location.x && l.y === item.location.y).sort(item => item.location.z!).getItems()
    let position = 0
    while (items[position]?.location.z === position) {
      position++
    }
    item.location.z = position
  }
}