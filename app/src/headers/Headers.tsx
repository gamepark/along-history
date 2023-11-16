/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { ComponentType } from 'react'
import { AchievementsHeader } from './AchievementsHeader'
import { AcquireCardsHeader } from './AcquireCardsHeader'
import { ActionsHeader } from './ActionsHeader'
import { CalamitiesHeader } from './CalamitiesHeader'
import { DecayHeader } from './DecayHeader'
import { LoseCardHeader } from './LoseCardHeader'
import { PayCardHeader } from './PayCardHeader'
import { PrepareArmyHeader } from './PrepareArmyHeader'
import { RollDiceHeader } from './RollDiceHeader'
import { TradeCardsHeader } from './TradeCardsHeader'
import { UseDiscardedDieHeader } from './UseDiscardedDieHeader'
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
  [RuleId.AcquireCards]: AcquireCardsHeader,
  [RuleId.Calamities]: CalamitiesHeader,
  [RuleId.Wars]: WarsHeader,
  [RuleId.PrepareArmy]: PrepareArmyHeader,
  //[RuleId.GeneralReRoll]: TODO,
  [RuleId.WarOutcome]: WarOutcomeHeader,
  //[RuleId.NewEvents]: TODO,
  [RuleId.Achievements]: AchievementsHeader,
  [RuleId.Decay]: DecayHeader,
  //[RuleId.UniversalResource]: TODO,
  //[RuleId.Upkeep]: TODO,

  [RuleId.LoseCard]: LoseCardHeader,
  [RuleId.LoseBonusCard]: LoseCardHeader,
  [RuleId.CannibalsFailure]: LoseCardHeader,
  [RuleId.EarthquakeFailure]: LoseCardHeader,
  [RuleId.StarvingFailure]: LoseCardHeader
}