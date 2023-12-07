import {
  CompetitiveScore,
  FillGapStrategy,
  HiddenMaterialRules,
  hideFront,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { Achievement, getAchievementValue } from './material/Achievement'
import { CardId } from './material/cards/CardId'
import { CardsInfo } from './material/cards/CardsInfo'
import { CardType } from './material/cards/CardType'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AchievementsRule } from './rules/AchievementsRule'
import { ActionsRule } from './rules/ActionsRule'
import { CannibalsFailureRule } from './rules/calamities/CannibalsFailureRule'
import { EarthquakeFailureRule } from './rules/calamities/EarthquakeFailureRule'
import { HarshWinterFailureRule } from './rules/calamities/HarshWinterFailureRule'
import { LoseBonusCardRule } from './rules/calamities/LoseBonusCardRule'
import { LoseCardRule } from './rules/calamities/LoseCardRule'
import { StarvingFailureRule } from './rules/calamities/StarvingFailureRule'
import { CalamitiesRule } from './rules/CalamitiesRule'
import { DecayRule } from './rules/DecayRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { GeneralReRollRule } from './rules/GeneralReRollRule'
import { NewEventsRule } from './rules/NewEventsRule'
import { PayCardRule } from './rules/PayCardRule'
import { PrepareArmyRule } from './rules/PrepareArmyRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { TradeCardsRule } from './rules/TradeCardsRule'
import { UpkeepRule } from './rules/UpkeepRule'
import { UseDiscardedDieRule } from './rules/UseDiscardedDieRule'
import { UseGoldDieRule } from './rules/UseGoldDieRule'
import { UseGoldenAgeDieRule } from './rules/UseGoldenAgeDieRule'
import { UseReRollDieRule } from './rules/UseReRollDieRule'
import { WarOutcomeRule } from './rules/WarOutcomeRule'
import { WarsRule } from './rules/WarsRule'
import { CivilisationAreaStrategy } from './util/CivilisationAreaStrategy'
import { FillGapZOnlyStrategy } from './util/FillGapZOnlyStrategy'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AlongHistoryRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>,
    TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.RollDice]: RollDiceRule,
    [RuleId.Actions]: ActionsRule,
    [RuleId.UseDiscardedDie]: UseDiscardedDieRule,
    [RuleId.UseReRollDie]: UseReRollDieRule,
    [RuleId.UseGoldenAgeDie]: UseGoldenAgeDieRule,
    [RuleId.TradeCards]: TradeCardsRule,
    [RuleId.PayCard]: PayCardRule,
    [RuleId.Calamities]: CalamitiesRule,
    [RuleId.Wars]: WarsRule,
    [RuleId.PrepareArmy]: PrepareArmyRule,
    [RuleId.GeneralReRoll]: GeneralReRollRule,
    [RuleId.WarOutcome]: WarOutcomeRule,
    [RuleId.NewEvents]: NewEventsRule,
    [RuleId.Achievements]: AchievementsRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.Upkeep]: UpkeepRule,
    [RuleId.UseGoldDie]: UseGoldDieRule,
    [RuleId.LoseCard]: LoseCardRule,
    [RuleId.LoseBonusCard]: LoseBonusCardRule,
    [RuleId.CannibalsFailure]: CannibalsFailureRule,
    [RuleId.EarthquakeFailure]: EarthquakeFailureRule,
    [RuleId.HarshWinterFailure]: HarshWinterFailureRule,
    [RuleId.StarvingFailure]: StarvingFailureRule,
    [RuleId.Decay]: DecayRule
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

  getScore(player: PlayerColor) {
    return this.getCivilisationCardsScore(player) - this.getDecayMalus(player) + this.getAchievementsScore(player)
  }

  getCivilisationCardsScore(player: PlayerColor) {
    const civilisationCards = this.material(MaterialType.Card)
      .location(LocationType.CivilisationArea)
      .player(player)
      .getItems<CardId>()
    return sumBy(civilisationCards, item => CardsInfo[item.id!.front].victoryPoints)
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

  giveTime(player: PlayerColor): number {
    if (this.game.rule?.id !== RuleId.Actions) {
      return 20 // 20 minutes / war / player
    }
    if (this.material(MaterialType.DiscardTile).getItem()?.location.player === player) {
      return 180 // 3 minutes for active player turn
    } else {
      return 60 // 1 minute for other players turns
    }
  }

  countCardType(player: PlayerColor, type: CardType) {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(player)
      .id<CardId>(id => CardsInfo[id.front].type === type).length
  }
}
