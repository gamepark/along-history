import { LocationType } from '@gamepark/along-history/material/LocationType'
import { PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp, Location } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { rulesLinkButton } from './EffectHelp'

export const CardLocationHelp = ({ location }: { location: Location }) => {
  const playerId = usePlayerId()
  const player = usePlayerName(location.player)
  switch (location.type) {
    case LocationType.EventArea:
      return <p><Trans defaults={location.player === playerId ? 'card.event-area.you' : 'card.event-area'} values={{ player }}>
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp(location)} local/>
      </Trans></p>
    case LocationType.CivilisationArea:
      if (location.z) {
        return <p><Trans defaults={location.player === playerId ? 'card.decay.you' : 'card.decay'} values={{ player }}>
          <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp(location)} local/>
          <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, player: location.player })} local/>
        </Trans></p>
      } else {
        return <p><Trans defaults={location.player === playerId ? 'card.civ-area.you' : 'card.civ-area'} values={{ player }}>
          <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp(location)} local/>
        </Trans></p>
      }
    default:
      return null
  }
}