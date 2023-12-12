/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialHelpProps, Picture, PlayMoveButton, PlayMoveButtonProps, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CreateItem, DeleteItem, isCreateItemType, isDeleteItemType, isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import Coin5Head from '../../images/tokens/coins/Coin5Head.png'
import { alignIcon, breakSpaces, roundCss } from '../../styles'

export const CoinHelp = ({ item, itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const take = useLegalMove<CreateItem>(isCreateItemType(MaterialType.Coin))
  const spend = useLegalMove<DeleteItem>(isDeleteItemType(MaterialType.Coin))
  const give = useLegalMove<MoveItem>(isMoveItemType(MaterialType.Coin))
  const player = usePlayerName(item.location?.player)

  return <>
    <h2>{t('coin.gold')}</h2>
    {item.location?.type === LocationType.PlayerCoins &&
      <p css={alignIcon}><Trans defaults={item.location.player === playerId ? 'coin.you' : 'coin.player'} values={{ player, gold: item.quantity ?? 1 }}>
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans></p>
    }
    {item.location?.type === LocationType.CoinsStock && take &&
      <p css={alignIcon}><PlayMoveButton move={take} onPlay={closeDialog} css={css`padding-bottom: 0`}>
        <Trans defaults="coin.take" values={{ gold: take.item.quantity ?? 1 }}>
          <Picture src={Coin5Head} css={roundCss}/>
        </Trans>
      </PlayMoveButton></p>
    }
    {spend && spend.itemIndex === itemIndex && <p css={alignIcon}><PlayMoveButton move={spend} onPlay={closeDialog} css={css`padding-bottom: 0`}>
      <Trans defaults="coin.spend" values={{ gold: spend.quantity ?? 1 }}>
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans>
    </PlayMoveButton></p>}
    {give && give.itemIndex === itemIndex && <p css={alignIcon}><GiveButton move={give} onPlay={closeDialog}/></p>}
    <p css={breakSpaces}>{t('coin.rules')}</p>
  </>
}

const GiveButton = (props: { move: MoveItem } & PlayMoveButtonProps) => {
  const player = usePlayerName((props.move as MoveItem).location.player)
  return <PlayMoveButton css={css`padding-bottom: 0`} {...props}>
    <Trans defaults="coin.give" values={{ gold: props.move.quantity ?? 1, player }}>
      <Picture src={Coin5Head} css={roundCss}/>
    </Trans>
  </PlayMoveButton>
}
