import {
  CompetitiveScore,
  FillGapStrategy,
  HiddenMaterialRules,
  hideFront,
  isCreateItemsAtOnce,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { Achievement, getAchievementValue } from './material/Achievement'
import { agesScoreMemory } from './material/Age'
import { CardId } from './material/cards/CardId'
import { CardsInfo } from './material/cards/CardsInfo'
import { CardType } from './material/cards/CardType'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AchievementsRule } from './rules/AchievementsRule'
import { ActionsRule } from './rules/ActionsRule'
import { BarbarianInvasionsFailureRule } from './rules/calamities/BarbarianInvasionsFailureRule'
import { BlackDeathFailureRule } from './rules/calamities/BlackDeathFailureRule'
import { CholeraFailureRule } from './rules/calamities/CholeraFailureRule'
import { CivilWarFailureRule } from './rules/calamities/CivilWarFailureRule'
import { EarthquakeFailureRule } from './rules/calamities/EarthquakeFailureRule'
import { Famine1FailureRule } from './rules/calamities/Famine1FailureRule'
import { HarshWinterFailureRule } from './rules/calamities/HarshWinterFailureRule'
import { LoseBonusCardRule } from './rules/calamities/LoseBonusCardRule'
import { LoseCardRule } from './rules/calamities/LoseCardRule'
import { LoseFigureRule } from './rules/calamities/LoseFigureRule'
import { LosePopulationBonusRule } from './rules/calamities/LosePopulationBonusRule'
import { LoseProgressRule } from './rules/calamities/LoseProgressRule'
import { PiracyFailureRule } from './rules/calamities/PiracyFailureRule'
import { SaxonsFailureRule } from './rules/calamities/SaxonsFailureRule'
import { SpartacusUprisingFailure } from './rules/calamities/SpartacusUprisingFailureRule'
import { TitheFailureRule } from './rules/calamities/TitheFailureRule'
import { TransmitCalamityRule } from './rules/calamities/TransmitCalamityRule'
import { VikingsFailureRule } from './rules/calamities/VikingsFailureRule'
import { CalamitiesRule } from './rules/CalamitiesRule'
import { CounterattackRule } from './rules/CounterattackRule'
import { DecayRule } from './rules/DecayRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { GeneralReRollRule } from './rules/GeneralReRollRule'
import { Memory } from './rules/Memory'
import { NewEventsRule } from './rules/NewEventsRule'
import { PayCardRule } from './rules/PayCardRule'
import { PoisonRule } from './rules/PoisonRule'
import { PrepareArmyRule } from './rules/PrepareArmyRule'
import { PrepareNextAgeRule } from './rules/PrepareNextAgeRule'
import { RansomRule } from './rules/RansomRule'
import { RobinHoodRule } from './rules/RobinHoodRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { SetupAgeRule } from './rules/SetupAgeRule'
import { SwapRule } from './rules/SwapRule'
import { TradeCardsRule } from './rules/TradeCardsRule'
import { TradeOnAcquisitionRule } from './rules/TradeOnAcquisitionRule'
import { UpkeepRule } from './rules/UpkeepRule'
import { UseDiscardedDieRule } from './rules/UseDiscardedDieRule'
import { UseGoldDieRule } from './rules/UseGoldDieRule'
import { UseGoldenAgeDieRule } from './rules/UseGoldenAgeDieRule'
import { UseGoldResultTokenRule } from './rules/UseGoldResultTokenRule'
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
    [RuleId.Decay]: DecayRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.Upkeep]: UpkeepRule,
    [RuleId.PrepareNextAge]: PrepareNextAgeRule,
    [RuleId.SetupAge]: SetupAgeRule,
    [RuleId.UseGoldDie]: UseGoldDieRule,
    [RuleId.UseGoldResultToken]: UseGoldResultTokenRule,
    [RuleId.Ransom]: RansomRule,
    [RuleId.Counterattack]: CounterattackRule,
    [RuleId.RobinHood]: RobinHoodRule,
    [RuleId.TradeOnAcquisition]: TradeOnAcquisitionRule,
    [RuleId.Swap]: SwapRule,
    [RuleId.Poison]: PoisonRule,
    [RuleId.LoseCard]: LoseCardRule,
    [RuleId.LoseBonusCard]: LoseBonusCardRule,
    [RuleId.LosePopulationBonus]: LosePopulationBonusRule,
    [RuleId.EarthquakeFailure]: EarthquakeFailureRule,
    [RuleId.HarshWinterFailure]: HarshWinterFailureRule,
    [RuleId.Famine1Failure]: Famine1FailureRule,
    [RuleId.CivilWarFailure]: CivilWarFailureRule,
    [RuleId.LoseFigure]: LoseFigureRule,
    [RuleId.SpartacusUprisingFailure]: SpartacusUprisingFailure,
    [RuleId.PiracyFailure]: PiracyFailureRule,
    [RuleId.BarbarianInvasionsFailure]: BarbarianInvasionsFailureRule,
    [RuleId.TransmitCalamity]: TransmitCalamityRule,
    [RuleId.LoseProgress]: LoseProgressRule,
    [RuleId.CholeraFailure]: CholeraFailureRule,
    [RuleId.BlackDeathFailure]: BlackDeathFailureRule,
    [RuleId.TitheFailure]: TitheFailureRule,
    [RuleId.VikingsFailure]: VikingsFailureRule,
    [RuleId.SaxonsFailure]: SaxonsFailureRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.EventArea]: new FillGapStrategy(),
      [LocationType.CivilisationArea]: new CivilisationAreaStrategy(),
      [LocationType.Legacy]: new PositiveSequenceStrategy()
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

  protected isRandomMove(move: MaterialMove<PlayerColor, MaterialType, LocationType>): boolean {
    if (isCreateItemsAtOnce(move) && move.itemType === MaterialType.AchievementToken) {
      return true
    }
    return super.isRandomMove(move)
  }

  getScore(player: PlayerColor) {
    const pastAgesScore = sumBy([Memory.PrehistoryScore, Memory.AntiquityScore, Memory.MiddleAgesScore],
      memory => this.remind(memory, player) ?? 0)
    const currentAgeScored = this.remind(agesScoreMemory[this.remind(Memory.CurrentAge)]) !== undefined || this.game.rule?.id === RuleId.PrepareNextAge
    return currentAgeScored ? pastAgesScore : pastAgesScore + this.getCurrentAgeScore(player)
  }

  getCurrentAgeScore(player: PlayerColor) {
    return this.getCivilisationCardsScore(player) - this.getDecayMalus(player) + this.getAchievementsScore(player)
  }

  getCivilisationCardsScore(player: PlayerColor) {
    const civilisationCards = this.material(MaterialType.Card)
      .location(LocationType.CivilisationArea)
      .player(player)
      .getItems<CardId>()
    return sumBy(civilisationCards, item => {
      const victoryPoints = CardsInfo[item.id!.front].victoryPoints
      if (isNaN(victoryPoints)) { // Al-Khawarizmi
        return Math.min(Math.floor(this.material(MaterialType.Coin).player(player).getQuantity() / 3), 4)
      }
      return victoryPoints
    })
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

  getTieBreaker(tieBreaker: number, player: number) {
    const achievementTokens = this.material(MaterialType.AchievementToken).player(player)
      .sort(item => -getAchievementValue(item.id)).getItems<Achievement>()
    const token = achievementTokens[tieBreaker - 1]
    if (!token || token.id === undefined) return
    return getAchievementValue(token.id)
  }

  giveTime(player: PlayerColor): number {
    switch (this.game.rule?.id) {
      case RuleId.Actions:
        if (this.hasStartedHisActions(player)) {
          return 0
        } else if (this.material(MaterialType.DiscardTile).getItem()?.location.player === player) {
          return 150 // 2.5 minutes for active player turn
        } else {
          return 90 // 1.5 minute for other players turns
        }
      case RuleId.Achievements:
        return 0 // no more time after new events revealed
      default:
        return 20 // 20 seconds for wars / poison / templar order
    }
  }

  hasStartedHisActions(player: PlayerColor) {
    if (this.material(MaterialType.Card).location(LocationType.EventArea).player(player).location(l => l.x! < 3).length < 3) {
      return true // One card already acquired or discarded
    }
    const isActivePlayer = this.material(MaterialType.DiscardTile).getItem()?.location.player === player
    return isActivePlayer && this.material(MaterialType.Dice).location(LocationType.DiscardTile).length > 0 // One dice already discarded
  }

  countCardType(player: PlayerColor, type: CardType) {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(player)
      .id<CardId>(id => CardsInfo[id.front].type === type).length
  }
}
