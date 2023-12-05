/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { ComponentType } from 'react'
import { AchievementsHeader } from './AchievementsHeader'
import { ActionsHeader } from './ActionsHeader'
import { CalamitiesHeader } from './CalamitiesHeader'
import { CalamityHeader } from './CalamityHeader'
import { DecayHeader } from './DecayHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { GoldenAgeHeader } from './GoldenAgeHeader'
import { NewEventsHeader } from './NewEventsHeader'
import { PayCardHeader } from './PayCardHeader'
import { PrepareArmyHeader } from './PrepareArmyHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { TradeCardsHeader } from './TradeCardsHeader'
import { UpkeepHeader } from './UpkeepHeader'
import { UseDiscardedDieHeader } from './UseDiscardedDieHeader'
import { UseGoldDieHeader } from './UseGoldDieHeader'
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
  //[RuleId.GeneralReRoll]: TODO,
  [RuleId.WarOutcome]: WarOutcomeHeader,
  [RuleId.NewEvents]: NewEventsHeader,
  [RuleId.Achievements]: AchievementsHeader,
  [RuleId.Decay]: DecayHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.Upkeep]: UpkeepHeader,

  [RuleId.UseGoldDie]: UseGoldDieHeader,

  [RuleId.LoseCard]: CalamityHeader,
  [RuleId.LoseBonusCard]: CalamityHeader,
  [RuleId.CannibalsFailure]: CalamityHeader,
  [RuleId.EarthquakeFailure]: CalamityHeader,
  [RuleId.HarshWinterFailure]: CalamityHeader,
  [RuleId.StarvingFailure]: CalamityHeader
}