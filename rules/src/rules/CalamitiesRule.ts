import { isSelectItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card } from '../material/Card'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CalamitiesRule extends PlayerTurnRule {
  onRuleStart() {
    const calamities = this.calamities
    if (calamities.length === 1) {
      this.memorize(Memory.Calamity, calamities.getIndex())
      return [this.rules().startRule(getCalamityFailureRule(calamities.getItem<CardId>()!.id!.front))]
    } else if (calamities.length === 0) {
      return [this.rules().startRule(RuleId.Wars)]
    }
    return []
  }

  get calamities() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .id<CardId>(id => CardsInfo[id.front].type === CardType.Calamity)
  }

  getPlayerMoves() {
    return this.calamities.selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.Card)(move)) {
      this.memorize(Memory.Calamity, move.itemIndex)
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!
      delete card.selected
      return [this.rules().startRule(getCalamityFailureRule(card.id!.front))]
    }
    return []
  }
}

export const getCalamityFailureRule = (calamity: Card) => {
  switch (calamity) {
    case Card.Cannibals:
    case Card.Flood:
    case Card.Famine2:
    case Card.Famine3:
      return RuleId.LosePopulationBonus
    case Card.Earthquake:
      return RuleId.EarthquakeFailure
    case Card.HarshWinter:
      return RuleId.HarshWinterFailure
    case Card.Famine1:
      return RuleId.Famine1Failure
    case Card.VolcanicEruption1:
    case Card.VolcanicEruption2:
      return RuleId.LoseBonusCard
    case Card.Wolves:
      return RuleId.LoseCard
    case Card.CivilWar:
    case Card.Heresy:
      return RuleId.CivilWarFailure
    case Card.Epidemic:
      return RuleId.LoseFigure
    case Card.Obscurantism:
      return RuleId.LoseProgress
    case Card.SpartacusUprising:
      return RuleId.SpartacusUprisingFailure
    case Card.Piracy:
      return RuleId.PiracyFailure
    case Card.BarbarianInvasions:
      return RuleId.BarbarianInvasionsFailure
    default:
      throw new Error(`Missing failure rule for calamity ${calamity}`)
  }
}