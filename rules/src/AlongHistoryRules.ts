import { FillGapStrategy, HiddenMaterialRules, hideFront, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AchievementsRule } from './rules/AchievementsRule'
import { AcquireCardsRule } from './rules/AcquireCardsRule'
import { CalamitiesRule } from './rules/CalamitiesRule'
import { NewEventsRule } from './rules/NewEventsRule'
import { PayCardRule } from './rules/PayCardRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { TradeCardsRule } from './rules/TradeCardsRule'
import { UseDiceRule } from './rules/UseDiceRule'
import { UseDiscardedDieRule } from './rules/UseDiscardedDieRule'
import { UseReRollDieRule } from './rules/UseReRollDieRule'
import { WarsRule } from './rules/WarsRule'
import { ArrivalOrderZStrategy } from './util/ArrivalOrderZStrategy'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AlongHistoryRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.RollDice]: RollDiceRule,
    [RuleId.UseDice]: UseDiceRule,
    [RuleId.UseDiscardedDie]: UseDiscardedDieRule,
    [RuleId.UseReRollDie]: UseReRollDieRule,
    [RuleId.TradeCards]: TradeCardsRule,
    [RuleId.PayCard]: PayCardRule,
    [RuleId.AcquireCards]: AcquireCardsRule,
    [RuleId.Calamities]: CalamitiesRule,
    [RuleId.Wars]: WarsRule,
    [RuleId.NewEvents]: NewEventsRule,
    [RuleId.Achievements]: AchievementsRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.EventArea]: new FillGapStrategy(),
      [LocationType.CivilisationArea]: new PositiveSequenceStrategy()
    },
    [MaterialType.CivilisationToken]: {
      [LocationType.AchievementsBoard]: new ArrivalOrderZStrategy()
    },
    [MaterialType.Dice]: {
      [LocationType.DiscardTile]: new FillGapStrategy(),
      [LocationType.PlayerDices]: new FillGapStrategy()
    },
    [MaterialType.ResultToken]: {
      [LocationType.ResultTokenStock]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideFront
    }
  }
}