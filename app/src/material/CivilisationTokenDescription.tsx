import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import Blue from '../images/tokens/civilisation/Blue.png'
import Green from '../images/tokens/civilisation/Green.png'
import Red from '../images/tokens/civilisation/Red.png'
import White from '../images/tokens/civilisation/White.png'
import Yellow from '../images/tokens/civilisation/Yellow.png'
import { CivilisationTokenHelp } from './help/CivilisationTokenHelp'

class CivilisationTokenDescription extends TokenDescription {
  width = 1.43
  height = 2
  borderRadius = 0.5

  images = {
    [PlayerColor.White]: White,
    [PlayerColor.Yellow]: Yellow,
    [PlayerColor.Blue]: Blue,
    [PlayerColor.Green]: Green,
    [PlayerColor.Red]: Red
  }

  help = CivilisationTokenHelp
}

export const civilisationTokenDescription = new CivilisationTokenDescription()