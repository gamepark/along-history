import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const alongHistoryAnimations = new MaterialGameAnimations()

alongHistoryAnimations.configure(and(isRule(RuleId.PayCard), isMoveItemType(MaterialType.Dice), isMyMove())).skip()

alongHistoryAnimations.configure(and(isRule(RuleId.PayCard), isMoveItemType(MaterialType.Card), isMyMove())).skip()

alongHistoryAnimations.configure(and(isRule(RuleId.PayCard), isMoveItemType(MaterialType.ResultToken), isMyMove())).skip()

alongHistoryAnimations.configure(and(move =>
  isMoveItemType(MaterialType.UniversalResource)(move) && move.location.type === LocationType.UniversalResourceStock,
  isMyMove()
)).skip()