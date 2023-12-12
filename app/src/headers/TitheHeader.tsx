/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/along-history/material/Card'
import { useAnimation } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { CalamityHeader } from './CalamityHeader'

export const TitheHeader = () => {
  const { t } = useTranslation()
  const animation = useAnimation()
  if (animation) {
    return <>{t(`card.name.${Card.Tithe}`)}</>
  } else {
    return <CalamityHeader/>
  }
}
