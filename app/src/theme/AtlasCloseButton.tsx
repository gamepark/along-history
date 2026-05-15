/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { gold, goldDark, goldLight, navyDark, navyDarker, navyLight } from './colors'

const closeCss = css`
  position: absolute;
  top: -0.6em;
  right: -0.6em;
  z-index: 10;
  width: 2.2em;
  height: 2.2em;
  font-size: min(calc(3em * var(--gp-scale)), 2.5vh);
  background:
    radial-gradient(circle at 35% 30%, ${navyLight} 0%, ${navyDark} 55%, ${navyDarker} 100%);
  border: 0.18em solid ${gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${goldLight};
  text-shadow: 0 0.04em 0.08em rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 0.15em 0.4em rgba(0, 0, 0, 0.55),
    inset 0 0.05em 0.1em rgba(255, 224, 138, 0.35),
    inset 0 -0.05em 0.1em rgba(0, 0, 0, 0.4);

  &::before {
    content: '';
    position: absolute;
    inset: 0.12em;
    border-radius: 50%;
    border: 0.06em dotted ${gold};
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-0.05em) rotate(90deg);
    border-color: ${goldLight};
    color: #fff;
    box-shadow:
      0 0.25em 0.7em rgba(240, 192, 64, 0.4),
      0 0.15em 0.4em rgba(0, 0, 0, 0.55),
      inset 0 0.05em 0.1em rgba(255, 224, 138, 0.5);
  }

  &:active {
    border-color: ${goldDark};
  }
`

export const AtlasCloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button css={closeCss} onClick={onClick}>
      &times;
    </button>
  )
}
