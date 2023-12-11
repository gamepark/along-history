import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { EffectType } from '../material/cards/effects/EffectType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TradeCardsRule } from './TradeCardsRule'

export class TradeOnAcquisitionRule extends TradeCardsRule {
  get opponentCardSelected() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).selected()
  }

  get transmissibleCards() {
    return this.material(MaterialType.Card).location(LocationType.EventArea)
      .id<CardId>(id => {
        const info = CardsInfo[id.front]
        return info.type !== CardType.Calamity && !info.effects.some(effect => effect.type === EffectType.NonTransmissible)
      })
  }
}