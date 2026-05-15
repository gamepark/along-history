import { PlayerColor } from '@gamepark/along-history/PlayerColor'

// 135° gradient per player color, going from a brighter hue at the
// top-left to a deeper hue at the bottom-right — same idiom as
// ../expedition and ../ipso, tuned for Along History's antique look.
export const playerGradients: Record<PlayerColor, string> = {
  [PlayerColor.White]: 'linear-gradient(135deg, #FBF5E2 0%, #C9B989 100%)',
  [PlayerColor.Yellow]: 'linear-gradient(135deg, #F8D26A 0%, #A47218 100%)',
  [PlayerColor.Blue]: 'linear-gradient(135deg, #3A78C0 0%, #102A55 100%)',
  [PlayerColor.Green]: 'linear-gradient(135deg, #6FB04A 0%, #29521C 100%)',
  [PlayerColor.Red]: 'linear-gradient(135deg, #D04030 0%, #6B1810 100%)'
}

// Body-text color that pairs with each gradient — light cream on dark
// gradients, ink on the pale White gradient.
export const playerTextColor: Record<PlayerColor, string> = {
  [PlayerColor.White]: '#3A2410',
  [PlayerColor.Yellow]: '#3A2410',
  [PlayerColor.Blue]: '#F2E6C8',
  [PlayerColor.Green]: '#F2E6C8',
  [PlayerColor.Red]: '#F2E6C8'
}
