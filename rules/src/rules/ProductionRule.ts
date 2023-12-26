import { PlayerTurnRule } from '@gamepark/rules-api'
import { isEqual, sum, uniqWith } from 'lodash'
import max from 'lodash/max'
import sumBy from 'lodash/sumBy'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, goldAmount, isGold, isPopulationSymbol, isResource } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { Memory } from './Memory'

export type VersatileProduction = {
  universalResources: number
  multipliers: number
  resourceDie?: Resource
  goldToMultiply: number
  populationToMultiply: number,
  pastBonuses: Bonus[][]
}

export type Cost = BuildCost | BuyCost | ChoiceCost

export type BuildCost = {
  population: number
  resources: Resource[]
}

export type BuyCost = {
  gold: number
}

export function isBuyCost(cost: Cost): cost is BuyCost {
  return typeof (cost as any).gold === 'number'
}

export type ChoiceCost = {
  choices: Cost[]
}

export function isChoiceCost(cost: Cost): cost is ChoiceCost {
  return Array.isArray((cost as any).choices)
}

export type Production = BuildCost & BuyCost & VersatileProduction

export class ProductionRule extends PlayerTurnRule {
  getProduction(player = this.player): Production {
    return {
      population: this.getPopulationProduction(player),
      resources: this.getResourcesProduction(player),
      gold: this.getAvailableGold(player),
      universalResources: this.getUniversalResources(player),
      multipliers: this.getMultipliers(player),
      populationToMultiply: this.getPopulationToMultiply(player),
      resourceDie: this.getResourceDie(player),
      goldToMultiply: this.getGoldToMultiply(player),
      pastBonuses: this.getPastBonuses(player)
    }
  }

  getPopulationProduction(player = this.player) {
    return this.getDicePopulationProduction(player) + this.getResultTokensPopulationProduction(player)
      + this.getCivCardsPopulationProduction(player) + this.getGoldenAgesPopulationProduction(player)
  }

  getDicePopulationProduction(player = this.player) {
    return sumBy(this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).id(DiceType.Population).getItems(),
      dice => getDiceSymbol(dice))
  }

  getResultTokensPopulationProduction(player = this.player) {
    return sumBy(this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(player).id(isPopulationSymbol)
      .rotation(undefined).getItems(), token => token.id)
  }

  getCivilisationCards(player = this.player) {
    const cardToPay = this.remind<number>(Memory.CardToPay)
    const cards = this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z).player(player)
    return cardToPay ? cards.filter((_, index) => index !== cardToPay) : cards
  }

  getCivCardsPopulationProduction(player = this.player) {
    return sumBy(this.getCivilisationCards(player).rotation(undefined).getItems<CardId>(),
      card => CardsInfo[card.id!.front].bonus.filter(isPopulationSymbol).length)
  }

  getGoldenAges(player = this.player) {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).getItems()
      .filter(dice => getDiceSymbol(dice) === DiceSymbol.GoldenAge).length
  }

  getGoldenAgesPopulationProduction(player = this.player) {
    const goldenAges = this.getGoldenAges(player)
    if (goldenAges === 0) return 0
    return goldenAges * sumBy(this.getCivilisationCards(player).getItems<CardId>(),
      card => CardsInfo[card.id!.front].bonus.filter(isPopulationSymbol).length)
  }

  getResourcesProduction(player = this.player): Resource[] {
    return [
      ...this.getResourcesFromDice(player),
      ...this.getResourcesFromResultTokens(player),
      ...this.getResourcesFromCivCards(player),
      ...this.getResourcesFromGoldenAges(player)
    ]
  }

  getResourcesFromDice(player = this.player): Resource[] {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).id(DiceType.Resource).getItems()
      .map(dice => getDiceSymbol(dice) as DiceSymbol & Resource)
  }

  getResourcesFromResultTokens(player = this.player): Resource[] {
    return this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(player).id(isResource)
      .rotation(undefined).getItems().map(token => token.id)
  }

  getResourcesFromCivCards(player = this.player): Resource[] {
    return this.getCivilisationCards(player).rotation(undefined).getItems<CardId>()
      .flatMap(card => CardsInfo[card.id!.front].bonus.filter(isResource))
  }

  getResourcesFromGoldenAges(player = this.player): Resource[] {
    const goldenAges = this.getGoldenAges(player)
    if (goldenAges === 0) return []
    const resources = this.getCivilisationCards(player).getItems<CardId>().flatMap(card => CardsInfo[card.id!.front].bonus.filter(isResource))
    return goldenAges === 1 ? resources : resources.concat(resources)
  }

  getAvailableGold(player = this.player): number {
    return this.material(MaterialType.Coin).player(player).getQuantity() + (this.getGoldProduction(player) ?? 0)
  }

  getGoldProduction(player = this.player): number {
    return this.getGoldDieProduction(player) + this.getGoldResultTokenProduction(player)
      + this.getCivCardsGoldProduction(player) + this.getGoldenAgesGoldProduction(player)
  }

  getGoldDieProduction(player = this.player) {
    const remainingGoldDie = this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .player(player).id(DiceType.Gold).getItem()
    return remainingGoldDie ? goldAmount(getDiceSymbol(remainingGoldDie)) : 0
  }

  getGoldResultTokenProduction(player = this.player) {
    const goldResultToken = this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(player).id(isGold)
      .rotation(undefined).getItem()
    return goldResultToken ? goldAmount(goldResultToken.id) : 0
  }

  getCivCardsGoldProduction(player = this.player) {
    return sumBy(this.getCivilisationCards(player).rotation(undefined).getItems<CardId>(),
      card => sum(CardsInfo[card.id!.front].bonus.filter(isGold).map(goldAmount)))
  }

  getGoldenAgesGoldProduction(player = this.player) {
    const goldenAges = this.getGoldenAges(player)
    if (goldenAges === 0) return 0
    return goldenAges * sumBy(this.getCivilisationCards(player).getItems<CardId>(),
      card => sum(CardsInfo[card.id!.front].bonus.filter(isGold).map(goldAmount)))
  }

  getUniversalResources(player = this.player) {
    return this.material(MaterialType.UniversalResource).player(player).getQuantity()
  }

  getMultipliers(player = this.player) {
    const dieToMultiply = this.remind<DiceSymbol | undefined>(Memory.DieToMultiply)
    const multiplier = this.remind<number>(Memory.Multiplier) ?? 0
    const multiplierInCombo = dieToMultiply !== undefined ? 0 : multiplier / 2
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).getItems()
      .filter(dice => getDiceSymbol(dice) === DiceSymbol.Multiplier).length + multiplierInCombo
  }

  getPopulationToMultiply(player = this.player) {
    const dieToMultiply = this.remind<DiceSymbol | undefined>(Memory.DieToMultiply)
    const multiplier = this.remind<number>(Memory.Multiplier) ?? 1
    const popToMultiplyWithCurrentCombo = dieToMultiply && isPopulationSymbol(dieToMultiply) ? dieToMultiply * multiplier : 0
    const bestRemainingPopDie = max(this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .player(player).id(DiceType.Population).getItems().map(getDiceSymbol)) ?? 0
    return Math.max(bestRemainingPopDie, popToMultiplyWithCurrentCombo)
  }

  getResourceDie(player = this.player): Resource | undefined {
    const dieToMultiply = this.remind<DiceSymbol>(Memory.DieToMultiply)
    const die = this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .player(player).id(DiceType.Resource).getItem()
    return isResource(dieToMultiply) ? dieToMultiply : die && getDiceSymbol(die) as Resource & DiceSymbol
  }

  getGoldToMultiply(player = this.player): number {
    const dieToMultiply = this.remind<DiceSymbol | undefined>(Memory.DieToMultiply)
    if (dieToMultiply && isGold(dieToMultiply)) {
      const multiplier = this.remind<number>(Memory.Multiplier) ?? 1
      return goldAmount(dieToMultiply) * multiplier
    } else {
      return this.getGoldDieProduction(player)
    }
  }

  getPastBonuses(player = this.player) {
    return this.remind(Memory.LegacyUsed) ? []
      : uniqWith(this.material(MaterialType.Card).location(LocationType.Legacy).player(player).getItems<CardId>()
        .map(item => CardsInfo[item.id!.front].bonus), isEqual)
  }
}