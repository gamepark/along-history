/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp, Location } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { DeckHelp } from '../../locators/help/DeckHelp'
import { rulesLinkButton } from '../../styles'

export const CardLocationHelp = ({ location }: { location: Location }) => {
  const playerId = usePlayerId()
  const player = usePlayerName(location.player)
  switch (location.type) {
    case LocationType.Deck:
      return <DeckHelp/>
    case LocationType.Discard:
      return <p><Trans defaults="card.discard-pile">
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp(location)} local/>
      </Trans></p>
    case LocationType.EventArea:
      return <p><Trans defaults={location.player === playerId ? 'card.event-area.you' : 'card.event-area'} values={{ player }}>
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp(location)} local/>
      </Trans></p>
    case LocationType.CivilisationArea:
      if (location.z) {
        return <p><Trans defaults={location.player === playerId ? 'card.decayed.you' : 'card.decayed'} values={{ player }}>
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