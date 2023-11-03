import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { intersection } from 'lodash'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, isPopulationSymbol, isResource } from '../material/DiceSymbol'
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
      moves.push(...this.flipPopulationResultToken)
      moves.push(...this.flipCardWithPopulationBonus)
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
    const resourceResultToken = this.playerResultTokens.id(isResource)
    if (resourceResultToken.length && resourcesCost.includes(resourceResultToken.getItem()!.id)) {
      moves.push(resourceResultToken.rotateItem(true))
    }
    if (resourcesCost.length) {
      moves.push(...this.flipCardWithResourceBonus(resourcesCost))
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

  get playerResultTokens() {
    return this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player).rotation(undefined)
  }

  get bonusCards() {
    const cardToPay = this.remind<number>(Memory.CardToPay)
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player).rotation(undefined)
      .filter((_, index) => index !== cardToPay)
  }

  get discardPopulationDice() {
    return this.playerDice.id(DiceType.Population).moveItems(diceToDiscardTile)
  }

  get flipPopulationResultToken() {
    return this.playerResultTokens.id(isPopulationSymbol).rotateItems(true)
  }

  get flipCardWithPopulationBonus() {
    return this.bonusCards
      .id<CardId>(cardId => CardsInfo[cardId.front].bonus.includes(Bonus.Population))
      .rotateItems(true)
  }

  flipCardWithResourceBonus(resources: (Resource | Bonus)[]) {
    return this.bonusCards
      .id<CardId>(cardId => intersection(CardsInfo[cardId.front].bonus, resources).length > 0)
      .rotateItems(true)
  }

  get costPaid() {
    return this.remind<number>(Memory.PopulationCost) === 0 && this.remind<Resource[]>(Memory.ResourcesCost).length === 0
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.DiscardTile) {
      this.pay(getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!))
    } else if (isMoveItem(move) && move.itemType === MaterialType.ResultToken && move.location.rotation) {
      this.pay(this.material(MaterialType.ResultToken).getItem(move.itemIndex)!.id)
    } else if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.rotation) {
      const bonus = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front].bonus
      for (const symbol of bonus) {
        this.pay(symbol)
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

  pay(symbol: DiceSymbol | Resource | Bonus) {
    if (isPopulationSymbol(symbol)) {
      this.memorize<number>(Memory.PopulationCost, cost => Math.max(cost - symbol, 0))
    } else if (isResource(symbol)) {
      const resourcesCost = this.remind<Resource[]>(Memory.ResourcesCost)
      resourcesCost.splice(resourcesCost.indexOf(symbol), 1)
    }
  }

  onRuleEnd() {
    this.memorize(Memory.CardAcquired, true)
    return []
  }
}