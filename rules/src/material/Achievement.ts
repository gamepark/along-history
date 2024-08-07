import { getEnumValues } from '@gamepark/rules-api'

export enum Achievement {
  Land = 10,
  Figure,
  VictoryPoints2,
  PopulationBonus,
  Progress,
  Bonus1,
  Cards3 = 20,
  CardTypes2,
  VictoryPoints4,
  Progress2 = 30,
  Lands2,
  Figures2,
  PopulationBonus2,
  Cards4,
  VictoryPoints8 = 40,
  Cards5,
  CardTypes3,
  Wonder,
  Figures3 = 50,
  VictoryPoints12,
  Bonus4,
  Progress3,
  Calamity,
  Cards6,
  Wonders2 = 60,
  Cards7,
  Calamities2,
  CardTypes4,
  VictoryPoints15 = 70,
  Bonus6,
  Gold15
}

export const achievements = getEnumValues(Achievement)

export const getAchievementValue = (achievement: Achievement) => Math.floor(achievement / 10)
