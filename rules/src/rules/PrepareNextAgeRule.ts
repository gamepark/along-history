import { listingToList, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Age } from '../material/Age'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { DiceType } from '../material/Dices'
import { isGold } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ResultTokens } from '../material/ResultTokens'
import { PlayerColor } from '../PlayerColor'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareNextAgeRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize<Age>(Memory.CurrentAge, age => age + 1)
    const age = this.remind<Age>(Memory.CurrentAge)
    const cards = this.material(MaterialType.Card)
    const moves: MaterialMove[] = []
    moves.push(cards.filter(card => !this.isActiveBonusCard(card)).deleteItemsAtOnce())
    moves.push(...cards.filter(card => this.isActiveBonusCard(card)).moveItems(item => (
      { type: LocationType.Legacy, player: item.location.player }
    )))
    const universalResourceStock = this.material(MaterialType.UniversalResource).location(LocationType.UniversalResourceStock)
    for (const player of this.game.players) {
      const universalResources = this.material(MaterialType.UniversalResource).player(player)
      const quantity = universalResources.getQuantity()
      if (quantity === 0) {
        moves.push(universalResourceStock.moveItem({ type: LocationType.PlayerUniversalResource, player }, 1))
      } else if (quantity === 2) {
        moves.push(universalResources.moveItem({ type: LocationType.UniversalResourceStock }, 1))
      }
    }
    if (age === Age.Antiquity) {
      moves.push(this.material(MaterialType.Dice).createItem({ id: DiceType.Gold, location: { type: LocationType.DiscardTile, parent: 0 } }))
      moves.push(this.material(MaterialType.ResultToken).createItemsAtOnce(
        listingToList(ResultTokens).filter(token => isGold(token)).map(id => (
          { id, location: { type: LocationType.ResultTokenStock } }
        ))
      ))
    }

    moves.push(this.material(MaterialType.AchievementToken).deleteItemsAtOnce())
    moves.push(...this.material(MaterialType.CivilisationToken).moveItems({ type: LocationType.AchievementsBoard, x: 0, y: 0 }))

    moves.push(this.rules().startRule(RuleId.SetupAge))

    return moves
  }

  isActiveBonusCard(card: MaterialItem<PlayerColor, LocationType, CardId>) {
    return card.location.type === LocationType.CivilisationArea && card.location.z === 0 && card.id !== undefined && CardsInfo[card.id.front].bonus.length > 0
  }
}