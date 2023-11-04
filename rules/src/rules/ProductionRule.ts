import { PlayerTurnRule } from '@gamepark/rules-api'
import max from 'lodash/max'
import sumBy from 'lodash/sumBy'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, isPopulationSymbol, isResource } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'

export type VersatileProduction = {
  universalResources: number
  multipliers: number
  resourceDie?: Resource
  bestPopulationDie: number
}

export type Cost = {
  population: number
  resources: Resource[]
}

export type Production = Cost & VersatileProduction

export class ProductionRule extends PlayerTurnRule {
  getProduction(player = this.player): Production {
    return {
      population: this.getPopulationProduction(player),
      resources: this.getResourcesProduction(player),
      universalResources: this.getUniversalResources(player),
      multipliers: this.getMultipliers(player),
      bestPopulationDie: this.getBestPopulationDie(player),
      resourceDie: this.getResourceDie(player)
    }
  }

  getPopulationProduction(player = this.player) {
    return this.getDicePopulationProduction(player) + this.getResultTokensPopulationProduction(player)
      + this.getCivCardsPopulationProduction(player) + this.getGoldenAgesPopulationProduction(player) // TODO: from past in multi ages
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
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(player)
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
      // TODO: Cards in the past
    ]
  }
  getResourcesFromDice(player = this.player): Resource[] {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).id(DiceType.Resource).getItems()
      .map(dice => getDiceSymbol(dice) as DiceSymbol & Resource)
  }

  getResourcesFromResultTokens(player = this.player): Resource[] {
    return this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(player).id(isPopulationSymbol)
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

  getUniversalResources(player = this.player) {
    return this.material(MaterialType.UniversalResource).player(player).getQuantity()
  }

  getMultipliers(player = this.player) {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(player).getItems()
      .filter(dice => getDiceSymbol(dice) === DiceSymbol.Multiplier).length
  }

  getBestPopulationDie(player = this.player) {
    return max(this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .player(player).id(DiceType.Population).getItems().map(dice => getDiceSymbol(dice))) ?? 0
  }

  getResourceDie(player = this.player): Resource | undefined {
    const die = this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .player(player).id(DiceType.Resource).getItem()
    return die && getDiceSymbol(die) as Resource & DiceSymbol
  }
}