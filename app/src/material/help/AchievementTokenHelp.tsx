/** @jsxImportSource @emotion/react */
import { Achievement, getAchievementValue } from '@gamepark/along-history/material/Achievement'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialHelpProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { rulesLinkButton } from './EffectHelp'

export const AchievementTokenHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  return <>
    <h2>{t('achievement.token')}</h2>
    <p>{t('achievement.value', { value: getAchievementValue(item.id) })}</p>
    {item.location?.type === LocationType.AchievementsBoard &&
      <p>
        <AchievementHelp achievement={item.id}>
          <strong/>
          <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
        </AchievementHelp>
      </p>
    }
    {item.location?.type === LocationType.PlayerAchievements &&
      <p>{item.location.player === playerId ? t('achievement.steal.you') : t('achievement.steal', { player })}</p>
    }
  </>
}

const AchievementHelp: FC<{ achievement: Achievement }> = ({ achievement, children }) => {
  const { t } = useTranslation()
  switch (achievement) {
    case Achievement.Land:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.1') }}>{children}</Trans>
    case Achievement.Figure:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.2') }}>{children}</Trans>
    case Achievement.VictoryPoints2:
      return <Trans defaults="achievement.victory-points" values={{ number: 2 }}>{children}</Trans>
    case Achievement.PopulationBonus:
      return <Trans defaults="achievement.bonus.pop" values={{ bonus: 1 }}>{children}</Trans>
    case Achievement.Progress:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.3') }}>{children}</Trans>
    case Achievement.Bonus1:
      return <Trans defaults="achievement.bonus" values={{ bonus: 1 }}>{children}</Trans>
    case Achievement.Cards3:
      return <Trans defaults="achievement.cards" values={{ cards: 3 }}>{children}</Trans>
    case Achievement.CardTypes2:
      return <Trans defaults="achievement.diff-types" values={{ types: 2 }}>{children}</Trans>
    case Achievement.VictoryPoints4:
      return <Trans defaults="achievement.victory-points" values={{ number: 4 }}>{children}</Trans>
    case Achievement.Progress2:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.3') }}>{children}</Trans>
    case Achievement.Lands2:
      return <Trans defaults="achievement.card-type" values={{ cards: 2, type: t('card.type.1') }}>{children}</Trans>
    case Achievement.Figures2:
      return <Trans defaults="achievement.card-type" values={{ cards: 2, type: t('card.type.2') }}>{children}</Trans>
    case Achievement.PopulationBonus2:
      return <Trans defaults="achievement.bonus.pop" values={{ bonus: 2 }}>{children}</Trans>
    case Achievement.Cards4:
      return <Trans defaults="achievement.cards" values={{ cards: 4 }}>{children}</Trans>
    case Achievement.VictoryPoints8:
      return <Trans defaults="achievement.victory-points" values={{ number: 8 }}>{children}</Trans>
    case Achievement.Cards5:
      return <Trans defaults="achievement.cards" values={{ cards: 5 }}>{children}</Trans>
    case Achievement.CardTypes3:
      return <Trans defaults="achievement.diff-types" values={{ types: 3 }}>{children}</Trans>
    case Achievement.Wonder:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.4') }}>{children}</Trans>
    case Achievement.Figures3:
      return <Trans defaults="achievement.card-type" values={{ cards: 3, type: t('card.type.2') }}>{children}</Trans>
    case Achievement.VictoryPoints12:
      return <Trans defaults="achievement.victory-points" values={{ number: 12 }}>{children}</Trans>
    case Achievement.Bonus4:
      return <Trans defaults="achievement.bonus" values={{ bonus: 4 }}>{children}</Trans>
    case Achievement.Progress3:
      return <Trans defaults="achievement.card-type" values={{ cards: 3, type: t('card.type.3') }}>{children}</Trans>
    case Achievement.Calamity:
      return <Trans defaults="achievement.card-type" values={{ cards: 1, type: t('card.type.5') }}>{children}</Trans>
    case Achievement.Cards6:
      return <Trans defaults="achievement.cards" values={{ cards: 6 }}>{children}</Trans>
    case Achievement.Wonders2:
      return <Trans defaults="achievement.card-type" values={{ cards: 2, type: t('card.type.4') }}>{children}</Trans>
    case Achievement.Cards7:
      return <Trans defaults="achievement.cards" values={{ cards: 7 }}>{children}</Trans>
    case Achievement.Calamities2:
      return <Trans defaults="achievement.card-type" values={{ cards: 2, type: t('card.type.5') }}>{children}</Trans>
    case Achievement.CardTypes4:
      return <Trans defaults="achievement.diff-types" values={{ types: 4 }}>{children}</Trans>
    case Achievement.VictoryPoints15:
      return <Trans defaults="achievement.victory-points" values={{ number: 15 }}>{children}</Trans>
    case Achievement.Bonus6:
      return <Trans defaults="achievement.bonus" values={{ bonus: 6 }}>{children}</Trans>
    case Achievement.Gold15:
      return <Trans defaults="achievement.gold" values={{ gold: 15 }}>{children}</Trans>
  }
}
