import { FillGapStrategy, HiddenMaterialRules, hideFront, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RollDices } from './rules/RollDices'
import { RuleId } from './rules/RuleId'
import { ArrivalOrderZStrategy } from './util/ArrivalOrderZStrategy'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AlongHistoryRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.RollDices]: RollDices
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.EventArea]: new FillGapStrategy()
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