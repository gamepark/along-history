/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { ComponentType } from 'react'
import { AchievementsHeader } from './AchievementsHeader'
import { ActionsHeader } from './ActionsHeader'
import { CalamitiesHeader } from './CalamitiesHeader'
import { CalamityHeader } from './CalamityHeader'
import { DecayHeader } from './DecayHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { GeneralReRollHeader } from './GeneralReRollHeader'
import { GoldenAgeHeader } from './GoldenAgeHeader'
import { HarshWinterHeader } from './HarshWinterHeader'
import { NewEventsHeader } from './NewEventsHeader'
import { PayCardHeader } from './PayCardHeader'
import { PiracyHeader } from './PiracyHeader'
import { PrepareArmyHeader } from './PrepareArmyHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { TradeCardsHeader } from './TradeCardsHeader'
import { TransmitCalamityHeader } from './TransmitCalamityHeader'
import { UpkeepHeader } from './UpkeepHeader'
import { UseDiscardedDieHeader } from './UseDiscardedDieHeader'
import { UseGoldDieHeader } from './UseGoldDieHeader'
import { UseGoldResultTokenHeader } from './UseGoldResultTokenHeader'
import { UseReRollDieHeader } from './UseReRollDieHeader'
import { WarOutcomeHeader } from './WarOutcomeHeader'
import { WarsHeader } from './WarsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.Actions]: ActionsHeader,
  [RuleId.UseDiscardedDie]: UseDiscardedDieHeader,
  [RuleId.UseReRollDie]: UseReRollDieHeader,
  [RuleId.TradeCards]: TradeCardsHeader,
  [RuleId.PayCard]: PayCardHeader,
  [RuleId.UseGoldenAgeDie]: GoldenAgeHeader,
  [RuleId.Calamities]: CalamitiesHeader,
  [RuleId.Wars]: WarsHeader,
  [RuleId.PrepareArmy]: PrepareArmyHeader,
  [RuleId.GeneralReRoll]: GeneralReRollHeader,
  [RuleId.WarOutcome]: WarOutcomeHeader,
  [RuleId.NewEvents]: NewEventsHeader,
  [RuleId.Achievements]: AchievementsHeader,
  [RuleId.Decay]: DecayHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.Upkeep]: UpkeepHeader,

  [RuleId.UseGoldDie]: UseGoldDieHeader,
  [RuleId.UseGoldResultToken]: UseGoldResultTokenHeader,

  [RuleId.LoseCard]: CalamityHeader,
  [RuleId.LoseBonusCard]: CalamityHeader,
  [RuleId.LosePopulationBonus]: CalamityHeader,
  [RuleId.EarthquakeFailure]: CalamityHeader,
  [RuleId.HarshWinterFailure]: HarshWinterHeader,
  [RuleId.Famine1Failure]: CalamityHeader,
  [RuleId.CivilWarFailure]: CalamityHeader,
  [RuleId.LoseFigure]: CalamityHeader,
  [RuleId.SpartacusUprisingFailure]: CalamityHeader,
  [RuleId.PiracyFailure]: PiracyHeader,
  [RuleId.BarbarianInvasionsFailure]: CalamityHeader,
  [RuleId.TransmitCalamity]: TransmitCalamityHeader
}