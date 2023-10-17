import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import Blue from '../images/tokens/civilisation/Blue.png'
import Green from '../images/tokens/civilisation/Green.png'
import Red from '../images/tokens/civilisation/Red.png'
import White from '../images/tokens/civilisation/White.png'
import Yellow from '../images/tokens/civilisation/Yellow.png'

class CivilisationTokenDescription extends TokenDescription {
  ratio = 1 / 1.4
  height = 2

  images = {
    [PlayerColor.White]: White,
    [PlayerColor.Yellow]: Yellow,
    [PlayerColor.Blue]: Blue,
    [PlayerColor.Green]: Green,
    [PlayerColor.Red]: Red
  }

  rules = () => <></>
}

export const civilisationTokenDescription = new CivilisationTokenDescription()