import { MaterialRulesPart } from '@gamepark/rules-api'
import { sumBy } from 'es-toolkit/compat'
import { Achievement, getAchievementValue } from '../material/Achievement'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'

export class Scoring extends MaterialRulesPart<PlayerColor, MaterialType, LocationType> {
  getCurrentAgeScore(player: PlayerColor) {
    return this.getCivilisationCardsScore(player) - this.getDecayMalus(player) + this.getAchievementsScore(player)
  }

  getCivilisationCardsScore(player: PlayerColor) {
    const civilisationCards = this.material(MaterialType.Card)
      .location(LocationType.CivilisationArea)
      .player(player)
      .getItems<CardId>()
    return sumBy(civilisationCards, item => {
      const victoryPoints = CardsInfo[item.id!.front].victoryPoints
      if (victoryPoints === undefined) { // Al-Khawarizmi
        return Math.min(Math.floor(this.material(MaterialType.Coin).player(player).getQuantity() / 3), 4)
      }
      return victoryPoints
    })
  }

  getDecayMalus(player: PlayerColor) {
    const decayCards = this.material(MaterialType.Card)
      .location(l => l.type === LocationType.CivilisationArea && l.z !== 0)
      .player(player)
      .getItems<CardId>()
    return sumBy(decayCards, (card) => CardsInfo[card.id!.front].bonus.length * 2)
  }

  getAchievementsScore(player: PlayerColor) {
    const achievements = this.material(MaterialType.AchievementToken)
      .location(LocationType.PlayerAchievements)
      .player(player)
      .getItems<Achievement>()
    return sumBy(achievements, item => getAchievementValue(item.id!))
  }
}
