import { isMoveItem, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { Achievement } from '../material/Achievement'
import { AchievementBoardLocations, AchievementsFrontPaths } from '../material/AchievementBoard'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class AchievementsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.accessibleTokens.filter(token => this.canAchieve(token.id)).map(token => this.civilizationToken.moveItem(token.location))
  }

  get civilizationToken() {
    return this.material(MaterialType.CivilisationToken).id(this.player)
  }

  get accessibleTokens() {
    const tokens: MaterialItem[] = []
    const civTokenLocation = this.civilizationToken.getItem()!.location as XYCoordinates
    const paths = AchievementsFrontPaths
    const explored: number[][] = AchievementBoardLocations.map(_ => [])
    explored[civTokenLocation.x].push(civTokenLocation.y)
    const available: XYCoordinates[] = [...paths[civTokenLocation.x][civTokenLocation.y]]
    while (available.length) {
      const { x, y } = available.pop()!
      const token = this.material(MaterialType.AchievementToken)
        .location(location => location.type === LocationType.AchievementsBoard && location.x === x && location.y === y)
      if (token.length) {
        tokens.push(token.getItem()!)
      } else {
        available.push(...paths[x][y].filter(space => !explored[space.x].includes(space.y)))
      }
      explored[x].push(y)
    }
    return tokens
  }

  canAchieve(achievement: Achievement) {
    switch (achievement) {
      case Achievement.Land:
        return this.hasCardType(CardType.Land)
      case Achievement.Figure:
        return this.hasCardType(CardType.Figure)
      case Achievement.VictoryPoints2:
        return this.hasCardsVictoryPoints(2)
      case Achievement.PopulationBonus:
        return this.hasPopulationBonus()
      case Achievement.Progress:
        return this.hasCardType(CardType.Progress)
      case Achievement.Bonus1:
        return this.hasBonus()
      case Achievement.Cards3:
        return this.playerCards.length >= 3
      case Achievement.CardTypes2:
        return this.hasDifferentCardsTypes(2)
      case Achievement.VictoryPoints4:
        return this.hasCardsVictoryPoints(4)
      case Achievement.Progress2:
        return this.hasCardType(CardType.Progress, 2)
      case Achievement.Lands2:
        return this.hasCardType(CardType.Land, 2)
      case Achievement.Figures2:
        return this.hasCardType(CardType.Figure, 2)
      case Achievement.PopulationBonus2:
        return this.hasPopulationBonus(2)
      case Achievement.Cards4:
        return this.playerCards.length >= 4
      case Achievement.VictoryPoints8:
        return this.hasCardsVictoryPoints(8)
      case Achievement.Cards5:
        return this.playerCards.length >= 5
      case Achievement.CardTypes3:
        return this.hasDifferentCardsTypes(3)
      case Achievement.Wonder:
        return this.hasCardType(CardType.Wonder)
      case Achievement.Figures3:
        return this.hasCardType(CardType.Figure, 3)
      case Achievement.VictoryPoints12:
        return this.hasCardsVictoryPoints(12)
      case Achievement.Bonus4:
        return this.hasBonus(4)
      case Achievement.Progress3:
        return this.hasCardType(CardType.Progress, 3)
      case Achievement.Calamity:
        return this.hasCardType(CardType.Calamity)
      case Achievement.Cards6:
        return this.playerCards.length >= 6
      case Achievement.Wonders2:
        return this.hasCardType(CardType.Wonder, 2)
      case Achievement.Cards7:
        return this.playerCards.length >= 7
      case Achievement.Calamities2:
        return this.hasCardType(CardType.Calamity, 2)
      case Achievement.CardTypes4:
        return this.hasDifferentCardsTypes(4)
      case Achievement.VictoryPoints15:
        return this.hasCardsVictoryPoints(15)
      case Achievement.Bonus6:
        return this.hasBonus(6)
      case Achievement.Gold15:
        return false // TODO gold
    }
  }

  hasCardType(cardType: CardType, quantity = 1) {
    return this.playerCards.filter(card => CardsInfo[card].type === cardType).length >= quantity
  }

  hasCardsVictoryPoints(quantity: number) {
    return sumBy(this.playerCards, card => CardsInfo[card].victoryPoints) >= quantity
  }

  hasBonus(quantity = 1) {
    return sumBy(this.playerCards, card => CardsInfo[card].bonus.length) >= quantity
  }

  hasPopulationBonus(quantity = 1) {
    return sumBy(this.playerCards, card => CardsInfo[card].bonus.filter(bonus => bonus === Bonus.Population).length) >= quantity
  }

  hasDifferentCardsTypes(quantity: number) {
    return new Set(this.playerCards.map(card => CardsInfo[card].type)).size >= quantity
  }

  get playerCards() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player).getItems<CardId>().map(item => item.id!.front)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.CivilisationToken) {
      const moves: MaterialMove[] = []
      const { type, x, y } = move.location
      const achievementToken = this.material(MaterialType.AchievementToken).location(location =>
        location.type === type && location.x === x && location.y === y
      )
      if (achievementToken.length) {
        moves.push(achievementToken.moveItem({ type: LocationType.PlayerAchievements, player: this.player, rotation: true }))
      }
      moves.push(this.rules().startRule(RuleId.UniversalResource))
      return moves
    }
    return []
  }
}
