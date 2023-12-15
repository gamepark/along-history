import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { isCancelEffect } from '../material/cards/effects/CancelEffect'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { DiceType } from '../material/Dices'
import { goldAmount, isGold } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareArmyRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Strength, this.warBonus, this.player)
    return []
  }

  get warBonus() {
    const isAttacker = this.remind(Memory.Attacker) === this.player
    const conditionRules = new ConditionRules(this.game)
    const cardsCancelled = this.getCivilisationCards(conditionRules.getOpponent(this.player)).getItems<CardId>().flatMap(item =>
      CardsInfo[item.id!.front].effects.filter(isCancelEffect).map(effect => effect.card)
    )
    return sumBy(this.getCivilisationCards().getItems<CardId>(), item => {
      const card = item.id!.front
      if (cardsCancelled.includes(card)) return 0
      return sumBy(CardsInfo[card].effects, effect => {
        if (effect.type !== EffectType.WarBonus || !conditionRules.hasCondition(effect.condition)) return 0
        if ((effect.attackOnly && !isAttacker) || (effect.defenseOnly && isAttacker)) return 0
        const multiplier = effect.multiplier ? conditionRules.countCondition(effect.multiplier) : 1
        return effect.bonus * multiplier
      })
    })
  }

  getCivilisationCards(player = this.player) {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z).player(player)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = this.getCivilisationCards().rotation(undefined)
      .id<CardId>(cardId => CardsInfo[cardId.front].bonus.includes(Bonus.Population))
      .rotateItems(true)
    moves.push(...this.artillery.moveItems({ type: LocationType.Discard }))
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move)) {
      if (move.location.rotation) {
        const bonuses = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front].bonus
        const populationBonus = bonuses.filter(bonus => bonus === Bonus.Population).length
        this.memorize<number>(Memory.Strength, strength => strength + populationBonus, this.player)
        const goldToEarn = sumBy(bonuses, bonus => isGold(bonus) ? goldAmount(bonus) : 0)
        if (goldToEarn) {
          return [this.material(MaterialType.Coin).createItem(
            { quantity: goldToEarn, location: { type: LocationType.PlayerCoins, player: move.location.player } }
          )]
        }
      } else if (move.location.type === LocationType.Discard) {
        return this.artilleryEffect
      }
    }
    return []
  }

  get activeCards() {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && l.player === this.player && !l.z)
  }

  get generals() {
    return this.activeCards.id<CardId>(id => id && CardsInfo[id.front].effects.some(effect => effect.type === EffectType.General)).length
  }

  get artillery() {
    return this.activeCards.id<CardId>(id => CardsInfo[id.front].effects.some(effect => effect.type === EffectType.Artillery))
  }

  get artilleryEffect() {
    const attacker = this.remind(Memory.Attacker)
    const defender = this.remind(Memory.Defender)
    const opponent = attacker === this.player ? defender : attacker
    this.memorize(Memory.Strength, 3, this.player)
    this.memorize(Memory.Strength, 0, opponent)
    return [this.rules().startRule(RuleId.WarOutcome)]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      let x = 4
      const moves: MaterialMove[] = this.material(MaterialType.Dice).id(DiceType.Population)
        .rollItems(() => ({ type: LocationType.PlayerResources, player: this.player, x: x++ }))
      this.memorize(Memory.GeneralsLeft, this.generals)
      moves.push(this.rules().startRule(RuleId.GeneralReRoll))
      return moves
    }
    return []
  }
}