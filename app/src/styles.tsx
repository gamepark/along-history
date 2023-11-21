/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { linkButtonCss } from '@gamepark/react-game'

export const rulesLinkButton = [linkButtonCss, css`
  color: inherit;
`]

export const alignIcon = css`
  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
    margin-bottom: 0.1em;
  }
`

export const roundCss = css`
  border-radius: 50%;
`

export const breakSpaces = css`
  white-space: break-spaces
`