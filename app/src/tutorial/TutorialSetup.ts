import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { Achievement, achievements } from '@gamepark/along-history/material/Achievement'
import { Card } from '@gamepark/along-history/material/Card'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'

export class TutorialSetup extends AlongHistorySetup {
  setupEventAreas() {
    this.getCard(Card.Forest).moveItem({ type: LocationType.EventArea, player: this.players[0] })
    this.getCard(Card.Swamp).moveItem({ type: LocationType.EventArea, player: this.players[0] })
    this.getCard(Card.Tiger).moveItem({ type: LocationType.EventArea, player: this.players[0] })

    this.getCard(Card.River).moveItem({ type: LocationType.EventArea, player: this.players[1] })
    this.getCard(Card.Hunting).moveItem({ type: LocationType.EventArea, player: this.players[1] })
    this.getCard(Card.HomoErectus).moveItem({ type: LocationType.EventArea, player: this.players[1] })

    this.getCard(Card.Wildcrafting).moveItem({ type: LocationType.EventArea, player: this.players[2] })
    this.getCard(Card.Fishing).moveItem({ type: LocationType.EventArea, player: this.players[2] })
    this.getCard(Card.Mammoth).moveItem({ type: LocationType.EventArea, player: this.players[2] })

    this.material(MaterialType.Card).location(LocationType.Deck).shuffle()
    this.getCard(Card.Wolves).moveItem({ type: LocationType.Deck })
    this.getCard(Card.Mountain).moveItem({ type: LocationType.Deck })
    this.getCard(Card.FuneralRites).moveItem({ type: LocationType.Deck })
    this.getCard(Card.Megaliths).moveItem({ type: LocationType.Deck })
    this.getCard(Card.Hills).moveItem({ type: LocationType.Deck })
    this.getCard(Card.Australopithecus).moveItem({ type: LocationType.Deck })
  }

  get achievements() {
    return achievements.filter(achievement =>
      achievement !== Achievement.Gold15 && achievement !== Achievement.Figure && achievement !== Achievement.PopulationBonus
    )
  }

  setupAchievementTokens() {
    super.setupAchievementTokens()
    const victoryPoints4 = this.material(MaterialType.AchievementToken).id(Achievement.VictoryPoints4).getItem()!
    if (victoryPoints4.location.y !== 0) {
      const achievementToSwap = this.material(MaterialType.AchievementToken).location(l => l.x === 2 && l.y === 0).getItem()!
      achievementToSwap.location.y = victoryPoints4.location.y
      victoryPoints4.location.y = 0
    }
  }

  getCard(card: Card) {
    return this.material(MaterialType.Card).location(LocationType.Deck).id<CardId>(id => id.front === card)
  }

  start() {
    const player = this.players[0]
    this.material(MaterialType.Dice).index(0).moveItem({ type: LocationType.PlayerResources, player, rotation: 3 })
    this.material(MaterialType.Dice).index(1).moveItem({ type: LocationType.PlayerResources, player, rotation: 0 })
    this.material(MaterialType.Dice).index(2).moveItem({ type: LocationType.PlayerResources, player, rotation: 4 })
    this.material(MaterialType.Dice).index(3).moveItem({ type: LocationType.PlayerResources, player, rotation: 2 })
    this.material(MaterialType.Dice).index(4).moveItem({ type: LocationType.PlayerResources, player, rotation: 2 })
    this.material(MaterialType.Dice).index(5).moveItem({ type: LocationType.PlayerResources, player, rotation: 5 })
    this.startPlayerTurn(RuleId.Actions, player)
  }
}