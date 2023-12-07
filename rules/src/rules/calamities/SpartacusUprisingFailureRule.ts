import { MaterialMove } from '@gamepark/rules-api'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { MaterialType } from '../../material/MaterialType'
import { LoseCardRule } from './LoseCardRule'

export class SpartacusUprisingFailure extends LoseCardRule {

  onRuleStart(): MaterialMove[] {
    return this.loseGold.concat(super.onRuleStart())
  }

  get loseGold(): MaterialMove[] {
    const playerCoins = this.material(MaterialType.Coin).player(this.player)
    const goldAmount = playerCoins.getQuantity()
    return goldAmount > 0 ? [playerCoins.deleteItem(Math.ceil(goldAmount / 2))] : []
  }

  getCardsToLose() {
    const cards = this.activeCards
    const bestVictoryPoints = Math.max(...cards.getItems<CardId>().map(item => CardsInfo[item.id!.front].victoryPoints))
    return cards.id<CardId>(id => CardsInfo[id!.front].victoryPoints === bestVictoryPoints)
  }
}