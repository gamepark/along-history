import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const alongHistoryAnimations = new MaterialGameAnimations()

alongHistoryAnimations.when().rule(RuleId.PayCard).move(isMoveItemType(MaterialType.Dice)).mine().none()

alongHistoryAnimations.when().rule(RuleId.PayCard).move(isMoveItemType(MaterialType.Card)).mine().none()

alongHistoryAnimations.when().rule(RuleId.PayCard).move(isMoveItemType(MaterialType.ResultToken)).mine().none()

alongHistoryAnimations.when().move(move =>
  isMoveItemType(MaterialType.UniversalResource)(move) && move.location.type === LocationType.UniversalResourceStock
).mine().none()