import { css } from '@emotion/react'
import { AtlasCloseButton } from './AtlasCloseButton'
import { AtlasNavigation } from './AtlasNavigation'
import {
  gold,
  goldDark,
  goldLight,
  ink,
  inkLight,
  navy,
  navyDark,
  navyDarker,
  navyLight,
  parchment,
  parchmentDark,
  parchmentDarker
} from './colors'
import { journalTheme } from './journal'

// Gold-bordered medallion button on parchment ground — feels like an
// illuminated atlas plate. Shared by header and dialog buttons below.
const atlasButtonCss = css`
  font-family: 'Cinzel', 'EB Garamond', Georgia, serif;
  font-size: 1.05em;
  font-weight: 700;
  letter-spacing: 0.04em;
  background:
    linear-gradient(135deg, ${parchment} 0%, ${parchmentDark} 55%, ${parchmentDarker} 100%);
  color: ${ink};
  border: 0.12em solid ${gold};
  border-radius: 0.3em;
  padding: 0.3em 0.7em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.35);
  box-shadow:
    0 0.12em 0.35em rgba(0, 0, 0, 0.4),
    inset 0 0.06em 0 rgba(255, 255, 255, 0.4),
    inset 0 -0.06em 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background:
      linear-gradient(135deg, #faf2dc 0%, ${parchment} 55%, ${parchmentDark} 100%);
    border-color: ${goldLight};
    box-shadow:
      0 0.25em 0.7em rgba(240, 192, 64, 0.35),
      0 0.12em 0.35em rgba(0, 0, 0, 0.4),
      inset 0 0.06em 0 rgba(255, 255, 255, 0.55);
    transform: translateY(-0.06em);
  }

  &:active {
    border-color: ${goldDark};
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #b8b0a0 0%, #a8a090 100%);
    border-color: #888070;
    color: #706858;
    box-shadow: none;
    text-shadow: none;
    cursor: default;

    img, picture {
      filter: grayscale(1) opacity(0.5);
    }
  }
`

// Parchment background for dialogs — slightly bluer than chateau-combo's
// to bridge with the navy game table.
const parchmentSurfaceCss = css`
  background:
    radial-gradient(ellipse at 22% 15%, rgba(216, 196, 152, 0.45), transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(15, 37, 66, 0.08), transparent 55%),
    linear-gradient(168deg, ${parchmentDarker} 0%, ${parchmentDark} 18%, ${parchment} 35%, ${parchmentDark} 65%, ${parchmentDarker} 100%);
`

export const theme = {
  root: {
    fontFamily: "'EB Garamond', Georgia, serif",
    background: {
      image: '/cover-1920.jpg',
      overlay: 'rgba(8, 23, 41, 0.78)'
    }
  },
  palette: {
    primary: gold,
    primaryHover: goldLight,
    primaryActive: goldDark,
    primaryLight: '#FFF4D8',
    primaryLighter: '#FFEBC0',
    surface: parchment,
    onSurface: ink,
    onSurfaceFocus: parchmentDark,
    onSurfaceActive: parchmentDarker,
    danger: '#8B2A2A',
    dangerHover: '#FFD8D0',
    dangerActive: '#FFC0B0',
    disabled: '#8B8070'
  },
  dialog: {
    backgroundColor: parchmentDark,
    color: ink,
    container: css`
      ${parchmentSurfaceCss};
      border-radius: 0.6em;
      box-shadow:
        0 0.7em 3em rgba(0, 0, 0, 0.7),
        0 0 0 0.12em rgba(184, 136, 28, 0.45),
        0 0 0 0.32em ${navyDark},
        0 0 0 0.38em rgba(184, 136, 28, 0.3);
      font-family: 'EB Garamond', Georgia, serif;

      h1, h2, h3 {
        font-family: 'Cinzel', serif;
        letter-spacing: 0.04em;
        color: ${navyDark};
      }
    `,
    content: css`
      font-family: 'EB Garamond', Georgia, serif;
      color: ${inkLight};
      @media only screen and (max-height: 599px) {
        font-size: 2.7em;
      }

      button {
        ${atlasButtonCss}
      }
    `,
    closeButton: AtlasCloseButton,
    navigation: AtlasNavigation
  },
  header: {
    bar: css`
      background:
        radial-gradient(ellipse at 50% 50%, rgba(240, 192, 64, 0.12), transparent 70%),
        linear-gradient(90deg, ${navyDarker}, ${navyDark} 20%, ${navy} 50%, ${navyDark} 80%, ${navyDarker});
      border-top: 0.08em solid rgba(240, 192, 64, 0.35);
      box-shadow: 0 0.15em 0.6em rgba(0, 0, 0, 0.55);
      font-family: 'Cinzel', 'EB Garamond', serif;
      color: ${parchment};
      letter-spacing: 0.03em;

      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        overflow: visible;
        margin: 0;
        text-shadow: 0 0.04em 0.08em rgba(0, 0, 0, 0.6);
      }
    `,
    buttons: css`
      ${atlasButtonCss};
      font-size: 0.8em;
      padding-top: 0.1em;
      padding-bottom: 0.1em;
      border-width: 0.08em;
    `
  },
  dropArea: {
    backgroundColor: 'rgba(240, 192, 64, 0.3)'
  },
  menu: {
    panel: css`
      ${parchmentSurfaceCss};
      color: ${inkLight};
      font-family: 'EB Garamond', Georgia, serif;
    `
  },
  playerPanel: {
    activeRingColors: [gold, goldLight] as [string, string]
  },
  journal: journalTheme
}

// Re-export commonly used tokens so feature code can stay in palette.
export { gold, goldDark, goldLight, ink, inkLight, navy, navyDark, navyDarker, navyLight, parchment, parchmentDark }
