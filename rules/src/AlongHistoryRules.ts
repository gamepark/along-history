import { FillGapStrategy, HiddenMaterialRules, hideFront, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { CardsInfo } from './material/cards/CardsInfo'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AchievementsRule } from './rules/AchievementsRule'
import { AcquireCardsRule } from './rules/AcquireCardsRule'
import { ActionsRule } from './rules/ActionsRule'
import { CannibalsFailureRule } from './rules/calamities/CannibalsFailureRule'
import { EarthquakeFailureRule } from './rules/calamities/EarthquakeFailureRule'
import { HarshWinterFailureRule } from './rules/calamities/HarshWinterFailureRule'
import { LoseBonusCardRule } from './rules/calamities/LoseBonusCardRule'
import { LoseCardRule } from './rules/calamities/LoseCardRule'
import { StarvingFailureRule } from './rules/calamities/StarvingFailureRule'
import { CalamitiesRule } from './rules/CalamitiesRule'
import { NewEventsRule } from './rules/NewEventsRule'
import { PayCardRule } from './rules/PayCardRule'
import { PrepareArmyRule } from './rules/PrepareArmyRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { TradeCardsRule } from './rules/TradeCardsRule'
import { UniversalResourceRule } from './rules/UniversalResourceRule'
import { UpkeepRule } from './rules/UpkeepRule'
import { UseDiscardedDieRule } from './rules/UseDiscardedDieRule'
import { UseReRollDieRule } from './rules/UseReRollDieRule'
import { WarOutcomeRule } from './rules/WarOutcomeRule'
import { WarsRule } from './rules/WarsRule'
import { FillGapZOnlyStrategy } from './util/FillGapZOnlyStrategy'
import { CivilisationAreaStrategy } from './util/CivilisationAreaStrategy'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AlongHistoryRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.RollDice]: RollDiceRule,
    [RuleId.Actions]: ActionsRule,
    [RuleId.UseDiscardedDie]: UseDiscardedDieRule,
    [RuleId.UseReRollDie]: UseReRollDieRule,
    [RuleId.TradeCards]: TradeCardsRule,
    [RuleId.PayCard]: PayCardRule,
    [RuleId.AcquireCards]: AcquireCardsRule,
    [RuleId.Calamities]: CalamitiesRule,
    [RuleId.Wars]: WarsRule,
    [RuleId.PrepareArmy]: PrepareArmyRule,
    [RuleId.WarOutcome]: WarOutcomeRule,
    [RuleId.NewEvents]: NewEventsRule,
    [RuleId.Achievements]: AchievementsRule,
    [RuleId.UniversalResource]: UniversalResourceRule,
    [RuleId.Upkeep]: UpkeepRule,
    [RuleId.LoseCard]: LoseCardRule,
    [RuleId.LoseBonusCard]: LoseBonusCardRule,
    [RuleId.CannibalsFailure]: CannibalsFailureRule,
    [RuleId.EarthquakeFailure]: EarthquakeFailureRule,
    [RuleId.HarshWinterFailure]: HarshWinterFailureRule,
    [RuleId.StarvingFailure]: StarvingFailureRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.EventArea]: new FillGapStrategy(),
      [LocationType.CivilisationArea]: new CivilisationAreaStrategy()
    },
    [MaterialType.CivilisationToken]: {
      [LocationType.AchievementsBoard]: new FillGapZOnlyStrategy()
    },
    [MaterialType.Dice]: {
      [LocationType.DiscardTile]: new FillGapStrategy(),
      [LocationType.PlayerResources]: new FillGapStrategy()
    },
    [MaterialType.ResultToken]: {
      [LocationType.ResultTokenStock]: new FillGapStrategy(),
      [LocationType.PlayerResources]: new FillGapStrategy()
    },
    [MaterialType.AchievementToken]: {
      [LocationType.PlayerAchievements]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideFront
    }
  }

  get isActivePlayerTurn() {
    return this.material(MaterialType.DiscardTile).getItem()?.location.player === this.game.rule?.player
  }

  getScore(player: PlayerColor) {
    return this.getDecayMalus(player)
  }

  getDecayMalus(player: PlayerColor) {
    const decayCards = this.material(MaterialType.Card)
      .location(LocationType.CivilisationArea)
      .player(player)
      .location(({ z }) => z !== 0)
      .getItems()
      .map((item) => item.id!.front)

    return decayCards.length > 1 ? sumBy(decayCards, (card) => CardsInfo[card].bonus.length * -2) : 0
  }
}
