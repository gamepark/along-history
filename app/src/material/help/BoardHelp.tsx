/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { PlayMoveButton, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces, rulesLinkButton } from '../../styles'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
import displayRulesHelp = MaterialMoveBuilder.displayRulesHelp

export const BoardHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()
  const player = usePlayerId() ?? rules?.players[0] ?? PlayerColor.White
  return <>
    <h2>{t('board.title')}</h2>
    <p css={breakSpaces}>
      <Trans defaults="achievements.rules">
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.CivilisationToken, { id: player })} local/>
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
      </Trans>
    </p>
  </>
}
