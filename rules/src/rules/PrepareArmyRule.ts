import { CustomMove, isMoveItem, isRoll, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { Bonus } from '../material/cards/Bonus'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { ConditionRules } from '../material/cards/effects/conditions/ConditionRules'
import { EffectType } from '../material/cards/effects/EffectType'
import { DiceType, getDiceSymbol } from '../material/Dices'
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
    return sumBy(this.civilisationCards.getItems<CardId>(), item =>
      sumBy(CardsInfo[item.id!.front].effects, effect => {
        if (effect.type !== EffectType.WarBonus || !conditionRules.hasCondition(effect.condition)) return 0
        if ((effect.attackOnly && !isAttacker) || (effect.defenseOnly && isAttacker)) return 0
        return effect.bonus
      })
    )
  }

  get civilisationCards() {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z).player(this.player)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = this.civilisationCards.rotation(undefined)
      .id<CardId>(cardId => CardsInfo[cardId.front].bonus.includes(Bonus.Population))
      .rotateItems(true)
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.rotation) {
      const bonus = CardsInfo[this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id!.front].bonus
        .filter(bonus => bonus === Bonus.Population).length
      this.memorize(Memory.Strength, strength => strength + bonus, this.player)
    } else if (isRoll(move) && move.itemType === MaterialType.Dice) {
      const bonus = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!)
      this.memorize(Memory.Strength, strength => strength + bonus, this.player)
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      let x = 4
      const moves: MaterialMove[] = this.material(MaterialType.Dice).id(DiceType.Population).rollItems(() => ({
        type: LocationType.PlayerResources,
        player: this.player,
        x: x++
      }))
      const defender = this.remind(Memory.Defender)
      if (this.player !== defender) {
        moves.push(this.rules().startPlayerTurn(RuleId.PrepareArmy, defender))
      } else {
        moves.push(this.rules().startRule(RuleId.WarOutcome))
      }
      return moves
    }
    return []
  }
}