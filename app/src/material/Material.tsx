import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { achievementTokenDescription } from './AchievementTokenDescription'
import { boardDescription } from './BoardDescription'
import { cardDescription } from './CardDescription'
import { civilisationTokenDescription } from './CivilisationTokenDescription'
import { coinDescription } from './CoinDescription'
import { diceDescription } from './DiceDescription'
import { discardTileDescription } from './DiscardTileDescription'
import { resultTokenDescription } from './ResultTokenDescription'
import { universalResourceDescription } from './UniversalResourceDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: cardDescription,
  [MaterialType.CivilisationToken]: civilisationTokenDescription,
  [MaterialType.Dice]: diceDescription,
  [MaterialType.ResultToken]: resultTokenDescription,
  [MaterialType.UniversalResource]: universalResourceDescription,
  [MaterialType.AchievementToken]: achievementTokenDescription,
  [MaterialType.DiscardTile]: discardTileDescription,
  [MaterialType.Coin]: coinDescription
}
