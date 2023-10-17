import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'

export class ArrivalOrderZStrategy implements LocationStrategy {
  addItem(material: Material, item: MaterialItem) {
    item.location.z = material.location(l => l.x === item.location.x && l.y === item.location.y).length
  }
}