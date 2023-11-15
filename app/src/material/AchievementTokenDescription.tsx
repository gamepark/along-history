import { Achievement, getAchievementValue } from '@gamepark/along-history/material/Achievement'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import AchievementValue1 from '../images/tokens/achievement/AchievementValue1.jpg'
import AchievementValue2 from '../images/tokens/achievement/AchievementValue2.jpg'
import AchievementValue3 from '../images/tokens/achievement/AchievementValue3.jpg'
import AchievementValue4 from '../images/tokens/achievement/AchievementValue4.jpg'
import AchievementValue5 from '../images/tokens/achievement/AchievementValue5.jpg'
import AchievementValue6 from '../images/tokens/achievement/AchievementValue6.jpg'
import AchievementValue7 from '../images/tokens/achievement/AchievementValue7.jpg'
import Bonus1 from '../images/tokens/achievement/Bonus1.jpg'
import Bonus4 from '../images/tokens/achievement/Bonus4.jpg'
import Bonus6 from '../images/tokens/achievement/Bonus6.jpg'
import Calamities2 from '../images/tokens/achievement/Calamities2.jpg'
import Calamity from '../images/tokens/achievement/Calamity.jpg'
import Cards3 from '../images/tokens/achievement/Cards3.jpg'
import Cards4 from '../images/tokens/achievement/Cards4.jpg'
import Cards5 from '../images/tokens/achievement/Cards5.jpg'
import Cards6 from '../images/tokens/achievement/Cards6.jpg'
import Cards7 from '../images/tokens/achievement/Cards7.jpg'
import CardTypes2 from '../images/tokens/achievement/CardTypes2.jpg'
import CardTypes3 from '../images/tokens/achievement/CardTypes3.jpg'
import CardTypes4 from '../images/tokens/achievement/CardTypes4.jpg'
import Figure from '../images/tokens/achievement/Figure.jpg'
import Figures2 from '../images/tokens/achievement/Figures2.jpg'
import Figures3 from '../images/tokens/achievement/Figures3.jpg'
import Gold15 from '../images/tokens/achievement/Gold15.jpg'
import Land from '../images/tokens/achievement/Land.jpg'
import Lands2 from '../images/tokens/achievement/Lands2.jpg'
import PopulationBonus from '../images/tokens/achievement/PopulationBonus.jpg'
import PopulationBonus2 from '../images/tokens/achievement/PopulationBonus2.jpg'
import Progress from '../images/tokens/achievement/Progress.jpg'
import Progress2 from '../images/tokens/achievement/Progress2.jpg'
import Progress3 from '../images/tokens/achievement/Progress3.jpg'
import VictoryPoints12 from '../images/tokens/achievement/VictoryPoints12.jpg'
import VictoryPoints15 from '../images/tokens/achievement/VictoryPoints15.jpg'
import VictoryPoints2 from '../images/tokens/achievement/VictoryPoints2.jpg'
import VictoryPoints4 from '../images/tokens/achievement/VictoryPoints4.jpg'
import VictoryPoints8 from '../images/tokens/achievement/VictoryPoints8.jpg'
import Wonder from '../images/tokens/achievement/Wonder.jpg'
import Wonders2 from '../images/tokens/achievement/Wonders2.jpg'
import { getPlayerRotation } from '../locators/PlayerLocator'

class AchievementTokenDescription extends TokenDescription {
  width = 2.45
  borderRadius = this.width / 2

  images = {
    [Achievement.Land]: Land,
    [Achievement.Figure]: Figure,
    [Achievement.VictoryPoints2]: VictoryPoints2,
    [Achievement.PopulationBonus]: PopulationBonus,
    [Achievement.Progress]: Progress,
    [Achievement.Bonus1]: Bonus1,
    [Achievement.Cards3]: Cards3,
    [Achievement.CardTypes2]: CardTypes2,
    [Achievement.VictoryPoints4]: VictoryPoints4,
    [Achievement.Progress2]: Progress2,
    [Achievement.Lands2]: Lands2,
    [Achievement.Figures2]: Figures2,
    [Achievement.PopulationBonus2]: PopulationBonus2,
    [Achievement.Cards4]: Cards4,
    [Achievement.VictoryPoints8]: VictoryPoints8,
    [Achievement.Cards5]: Cards5,
    [Achievement.CardTypes3]: CardTypes3,
    [Achievement.Wonder]: Wonder,
    [Achievement.Figures3]: Figures3,
    [Achievement.VictoryPoints12]: VictoryPoints12,
    [Achievement.Bonus4]: Bonus4,
    [Achievement.Progress3]: Progress3,
    [Achievement.Calamity]: Calamity,
    [Achievement.Cards6]: Cards6,
    [Achievement.Wonders2]: Wonders2,
    [Achievement.Cards7]: Cards7,
    [Achievement.Calamities2]: Calamities2,
    [Achievement.CardTypes4]: CardTypes4,
    [Achievement.VictoryPoints15]: VictoryPoints15,
    [Achievement.Bonus6]: Bonus6,
    [Achievement.Gold15]: Gold15
  }

  protected getBackId(achievement: Achievement): number {
    return getAchievementValue(achievement)
  }

  backImages = {
    [1]: AchievementValue1,
    [2]: AchievementValue2,
    [3]: AchievementValue3,
    [4]: AchievementValue4,
    [5]: AchievementValue5,
    [6]: AchievementValue6,
    [7]: AchievementValue7
  }

  getLocations(_item: MaterialItem, { index }: ItemContext): Location[] {
    return [{ type: LocationType.AchievementToken, parent: index }]
  }

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.player !== undefined
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context)
  }

  rules = () => <></>
}

export const achievementTokenDescription = new AchievementTokenDescription()