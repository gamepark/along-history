/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const SetupAgeHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!

  return <>{t(`header.setup-age.${rules.remind(Memory.CurrentAge)}`)}</>
}
