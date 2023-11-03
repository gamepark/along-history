import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { isPopulationSymbol, isResource } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const populationCost = this.remind<number>(Memory.PopulationCost)
    if (populationCost > 0) {
      moves.push(...this.discardPopulationDice)
    }
    const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
    const resourceDie = this.playerDice.id(DiceType.Resource)
    const resourceDieItem = resourceDie.getItem()
    if (resourceDieItem) {
      const dieResource = getDiceSymbol(resourceDieItem)
      if (isResource(dieResource) && resourcesCost.includes(dieResource)) {
        moves.push(resourceDie.moveItem(diceToDiscardTile))
      }
    }
    const universalResource = this.material(MaterialType.UniversalResource).player(this.player)
    if (universalResource.length) {
      moves.push(universalResource.moveItem({ type: LocationType.UniversalResourceStock }))
    }
    return moves
  }

  get playerDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
  }

  get discardPopulationDice() {
    return this.playerDice.id(DiceType.Population).moveItems(diceToDiscardTile)
  }

  get costPaid() {
    return this.remind<number>(Memory.PopulationCost) === 0 && this.remind<Resource[]>(Memory.ResourcesCost).length === 0
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      const symbol = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      if (isPopulationSymbol(symbol)) {
        this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - symbol, 0))
      } else if (isResource(symbol)) {
        const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
        resourcesCost.splice(resourcesCost.indexOf(symbol), 1)
      }
    } else if (isMoveItem(move) && move.itemType === MaterialType.UniversalResource && move.location.type === LocationType.UniversalResourceStock) {
      const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
      if (resourcesCost.length > 0) {
        resourcesCost.pop()
      } else {
        this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - 3, 0))
      }
    }
    if (this.costPaid) {
      return [this.rules().startRule(RuleId.AcquireCards)]
    }
    return []
  }

  onRuleEnd() {
    this.memorize(Memory.CardAcquired, true)
    return []
  }
}