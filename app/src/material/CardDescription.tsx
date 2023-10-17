import { Card } from '@gamepark/along-history/material/Card'
import { CardDescription } from '@gamepark/react-game'
import Forest from '../images/cards/prehistory/fr/Forest.jpg'
import Hills from '../images/cards/prehistory/fr/Hills.jpg'
import Mountain from '../images/cards/prehistory/fr/Mountain.jpg'
import Peninsula from '../images/cards/prehistory/fr/Peninsula.jpg'
import Lowland from '../images/cards/prehistory/fr/Lowland.jpg'
import River from '../images/cards/prehistory/fr/River.jpg'
import Swamp from '../images/cards/prehistory/fr/Swamp.jpg'
import Valley from '../images/cards/prehistory/fr/Valley.jpg'
import Woodlands from '../images/cards/prehistory/fr/Woodlands.jpg'
import LascauxCave from '../images/cards/prehistory/fr/LascauxCave.jpg'
import Megaliths from '../images/cards/prehistory/fr/Megaliths.jpg'
import Stonehenge from '../images/cards/prehistory/fr/Stonehenge.jpg'
import Australopithecus from '../images/cards/prehistory/fr/Australopithecus.jpg'
import Bear from '../images/cards/prehistory/fr/Bear.jpg'
import Crocodile from '../images/cards/prehistory/fr/Crocodile.jpg'
import CroMagnon from '../images/cards/prehistory/fr/CroMagnon.jpg'
import HomoErectus from '../images/cards/prehistory/fr/HomoErectus.jpg'
import HomoSapiens from '../images/cards/prehistory/fr/HomoSapiens.jpg'
import Mammoth from '../images/cards/prehistory/fr/Mammoth.jpg'
import Neanderthal from '../images/cards/prehistory/fr/Neanderthal.jpg'
import Tiger from '../images/cards/prehistory/fr/Tiger.jpg'
import WoollyRhinoceros from '../images/cards/prehistory/fr/WoollyRhinoceros.jpg'
import TheFire from '../images/cards/prehistory/fr/TheFire.jpg'
import FuneralRites from '../images/cards/prehistory/fr/FuneralRites.jpg'
import Wildcrafting from '../images/cards/prehistory/fr/Wildcrafting.jpg'
import Fishing from '../images/cards/prehistory/fr/Fishing.jpg'
import Hunting from '../images/cards/prehistory/fr/Hunting.jpg'
import Tools from '../images/cards/prehistory/fr/Tools.jpg'
import Weapons from '../images/cards/prehistory/fr/Weapons.jpg'
import Cannibals from '../images/cards/prehistory/fr/Cannibals.jpg'
import Wolves from '../images/cards/prehistory/fr/Wolves.jpg'
import Earthquake from '../images/cards/prehistory/fr/Earthquake.jpg'
import HarshWinter from '../images/cards/prehistory/fr/HarshWinter.jpg'
import Starving from '../images/cards/prehistory/fr/Starving.jpg'
import VolcanicEruption from '../images/cards/prehistory/fr/VolcanicEruption.jpg'

class AlongHistoryCardDescription extends CardDescription {
  images = {
    [Card.Forest]: Forest,
    [Card.Hills]: Hills,
    [Card.Mountain]: Mountain,
    [Card.Peninsula]: Peninsula,
    [Card.Lowland]: Lowland,
    [Card.River]: River,
    [Card.Swamp]: Swamp,
    [Card.Valley]: Valley,
    [Card.Woodlands]: Woodlands,
    [Card.LascauxCave]: LascauxCave,
    [Card.Megaliths]: Megaliths,
    [Card.Stonehenge]: Stonehenge,
    [Card.Australopithecus]: Australopithecus,
    [Card.Bear]: Bear,
    [Card.Crocodile]: Crocodile,
    [Card.CroMagnon]: CroMagnon,
    [Card.HomoErectus]: HomoErectus,
    [Card.HomoSapiens]: HomoSapiens,
    [Card.Mammoth]: Mammoth,
    [Card.Neanderthal]: Neanderthal,
    [Card.Tiger]: Tiger,
    [Card.WoollyRhinoceros]: WoollyRhinoceros,
    [Card.TheFire]: TheFire,
    [Card.FuneralRites]: FuneralRites,
    [Card.Wildcrafting]: Wildcrafting,
    [Card.Fishing]: Fishing,
    [Card.Hunting]: Hunting,
    [Card.Tools]: Tools,
    [Card.Weapons]: Weapons,
    [Card.Cannibals]: Cannibals,
    [Card.Wolves]: Wolves,
    [Card.Earthquake]: Earthquake,
    [Card.HarshWinter]: HarshWinter,
    [Card.Starving]: Starving,
    [Card.VolcanicEruption]: VolcanicEruption
  }

  rules = () => <></>
}

export const cardDescription = new AlongHistoryCardDescription()