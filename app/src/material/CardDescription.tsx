/** @jsxImportSource @emotion/react */
import { Age } from '@gamepark/along-history/material/Age'
import { Card } from '@gamepark/along-history/material/Card'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import AntiquityBack from '../images/cards/antiquity/AntiquityBack.jpg'
import Agriculture from '../images/cards/antiquity/fr/Agriculture.jpg'
import AlexanderTheGreat from '../images/cards/antiquity/fr/AlexanderTheGreat.jpg'
import AlluvialPlain from '../images/cards/antiquity/fr/AlluvialPlain.jpg'
import Architecture from '../images/cards/antiquity/fr/Architecture.jpg'
import Aristotle from '../images/cards/antiquity/fr/Aristotle.jpg'
import Astronomy from '../images/cards/antiquity/fr/Astronomy.jpg'
import Attila from '../images/cards/antiquity/fr/Attila.jpg'
import BarbarianInvasions from '../images/cards/antiquity/fr/BarbarianInvasions.jpg'
import Bocage from '../images/cards/antiquity/fr/Bocage.jpg'
import CivilWar from '../images/cards/antiquity/fr/CivilWar.jpg'
import Cleopatra from '../images/cards/antiquity/fr/Cleopatra.jpg'
import Coast from '../images/cards/antiquity/fr/Coast.jpg'
import ColossusOfRhodes from '../images/cards/antiquity/fr/ColossusOfRhodes.jpg'
import Desert from '../images/cards/antiquity/fr/Desert.jpg'
import Domestication from '../images/cards/antiquity/fr/Domestication.jpg'
import Epidemic from '../images/cards/antiquity/fr/Epidemic.jpg'
import Famine2 from '../images/cards/antiquity/fr/Famine2.jpg'
import FertilePlain from '../images/cards/antiquity/fr/FertilePlain.jpg'
import Flood from '../images/cards/antiquity/fr/Flood.jpg'
import GreatPyramidOfGiza from '../images/cards/antiquity/fr/GreatPyramidOfGiza.jpg'
import GreatWallOfChina from '../images/cards/antiquity/fr/GreatWallOfChina.jpg'
import HangingGardensOfBabylon from '../images/cards/antiquity/fr/HangingGardensOfBabylon.jpg'
import Hannibal from '../images/cards/antiquity/fr/Hannibal.jpg'
import Hippocrates from '../images/cards/antiquity/fr/Hippocrates.jpg'
import HorsebackRiding from '../images/cards/antiquity/fr/HorsebackRiding.jpg'
import IronWorking from '../images/cards/antiquity/fr/IronWorking.jpg'
import JuliusCaesar from '../images/cards/antiquity/fr/JuliusCaesar.jpg'
import LighthouseOfAlexandria from '../images/cards/antiquity/fr/LighthouseOfAlexandria.jpg'
import MacedonianPhalanx from '../images/cards/antiquity/fr/MacedonianPhalanx.jpg'
import Mathematics from '../images/cards/antiquity/fr/Mathematics.jpg'
import MausoleumOfHalicarnassus from '../images/cards/antiquity/fr/MausoleumOfHalicarnassus.jpg'
import Medicine from '../images/cards/antiquity/fr/Medicine.jpg'
import NebuchadnezzarII from '../images/cards/antiquity/fr/NebuchadnezzarII.jpg'
import Pericles from '../images/cards/antiquity/fr/Pericles.jpg'
import Philosophy from '../images/cards/antiquity/fr/Philosophy.jpg'
import Piracy from '../images/cards/antiquity/fr/Piracy.jpg'
import Pompei from '../images/cards/antiquity/fr/Pompei.jpg'
import Pythagoras from '../images/cards/antiquity/fr/Pythagoras.jpg'
import RomanLegions from '../images/cards/antiquity/fr/RomanLegions.jpg'
import Sailing from '../images/cards/antiquity/fr/Sailing.jpg'
import SpartacusUprising from '../images/cards/antiquity/fr/SpartacusUprising.jpg'
import StatueOfZeus from '../images/cards/antiquity/fr/StatueOfZeus.jpg'
import Steppes from '../images/cards/antiquity/fr/Steppes.jpg'
import SunTzu from '../images/cards/antiquity/fr/SunTzu.jpg'
import TheWheel from '../images/cards/antiquity/fr/TheWheel.jpg'
import VolcanicEruption2 from '../images/cards/antiquity/fr/VolcanicEruption2.jpg'
import WildIsland from '../images/cards/antiquity/fr/WildIsland.jpg'
import Writing from '../images/cards/antiquity/fr/Writing.jpg'
import Australopithecus from '../images/cards/prehistory/fr/Australopithecus.jpg'
import Bear from '../images/cards/prehistory/fr/Bear.jpg'
import Cannibals from '../images/cards/prehistory/fr/Cannibals.jpg'
import Crocodile from '../images/cards/prehistory/fr/Crocodile.jpg'
import CroMagnon from '../images/cards/prehistory/fr/CroMagnon.jpg'
import Earthquake from '../images/cards/prehistory/fr/Earthquake.jpg'
import Famine1 from '../images/cards/prehistory/fr/Famine1.jpg'
import Fishing from '../images/cards/prehistory/fr/Fishing.jpg'
import Forest from '../images/cards/prehistory/fr/Forest.jpg'
import FuneralRites from '../images/cards/prehistory/fr/FuneralRites.jpg'
import HarshWinter from '../images/cards/prehistory/fr/HarshWinter.jpg'
import Hills from '../images/cards/prehistory/fr/Hills.jpg'
import HomoErectus from '../images/cards/prehistory/fr/HomoErectus.jpg'
import HomoSapiens from '../images/cards/prehistory/fr/HomoSapiens.jpg'
import Hunting from '../images/cards/prehistory/fr/Hunting.jpg'
import LascauxCave from '../images/cards/prehistory/fr/LascauxCave.jpg'
import Lowland from '../images/cards/prehistory/fr/Lowland.jpg'
import Mammoth from '../images/cards/prehistory/fr/Mammoth.jpg'
import Megaliths from '../images/cards/prehistory/fr/Megaliths.jpg'
import Mountain from '../images/cards/prehistory/fr/Mountain.jpg'
import Neanderthal from '../images/cards/prehistory/fr/Neanderthal.jpg'
import Peninsula from '../images/cards/prehistory/fr/Peninsula.jpg'
import River from '../images/cards/prehistory/fr/River.jpg'
import Sedentism from '../images/cards/prehistory/fr/Sedentism.jpg'
import Stonehenge from '../images/cards/prehistory/fr/Stonehenge.jpg'
import Swamp from '../images/cards/prehistory/fr/Swamp.jpg'
import TheFire from '../images/cards/prehistory/fr/TheFire.jpg'
import Tiger from '../images/cards/prehistory/fr/Tiger.jpg'
import Tools from '../images/cards/prehistory/fr/Tools.jpg'
import Valley from '../images/cards/prehistory/fr/Valley.jpg'
import VolcanicEruption1 from '../images/cards/prehistory/fr/VolcanicEruption1.jpg'
import Weapons from '../images/cards/prehistory/fr/Weapons.jpg'
import Wildcrafting from '../images/cards/prehistory/fr/Wildcrafting.jpg'
import Wolves from '../images/cards/prehistory/fr/Wolves.jpg'
import Woodlands from '../images/cards/prehistory/fr/Woodlands.jpg'
import WoollyRhinoceros from '../images/cards/prehistory/fr/WoollyRhinoceros.jpg'
import PrehistoryBack from '../images/cards/prehistory/PrehistoryBack.jpg'
import { getPlayerRotation } from '../locators/PlayerLocator'
import { CardHelp } from './help/CardHelp'

class AlongHistoryCardDescription extends CardDescription {
  height = 8.89

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
    [Card.Sedentism]: Sedentism,
    [Card.Tools]: Tools,
    [Card.Weapons]: Weapons,
    [Card.Cannibals]: Cannibals,
    [Card.Wolves]: Wolves,
    [Card.Earthquake]: Earthquake,
    [Card.HarshWinter]: HarshWinter,
    [Card.Famine1]: Famine1,
    [Card.VolcanicEruption1]: VolcanicEruption1,

    [Card.Agriculture]: Agriculture,
    [Card.AlexanderTheGreat]: AlexanderTheGreat,
    [Card.AlluvialPlain]: AlluvialPlain,
    [Card.Architecture]: Architecture,
    [Card.Aristotle]: Aristotle,
    [Card.Astronomy]: Astronomy,
    [Card.Attila]: Attila,
    [Card.BarbarianInvasions]: BarbarianInvasions,
    [Card.Bocage]: Bocage,
    [Card.CivilWar]: CivilWar,
    [Card.Cleopatra]: Cleopatra,
    [Card.Coast]: Coast,
    [Card.ColossusOfRhodes]: ColossusOfRhodes,
    [Card.Desert]: Desert,
    [Card.Domestication]: Domestication,
    [Card.Epidemic]: Epidemic,
    [Card.FertilePlain]: FertilePlain,
    [Card.Flood]: Flood,
    [Card.GreatPyramidOfGiza]: GreatPyramidOfGiza,
    [Card.GreatWallOfChina]: GreatWallOfChina,
    [Card.HangingGardensOfBabylon]: HangingGardensOfBabylon,
    [Card.Hannibal]: Hannibal,
    [Card.Hippocrates]: Hippocrates,
    [Card.HorsebackRiding]: HorsebackRiding,
    [Card.IronWorking]: IronWorking,
    [Card.JuliusCaesar]: JuliusCaesar,
    [Card.LighthouseOfAlexandria]: LighthouseOfAlexandria,
    [Card.MacedonianPhalanx]: MacedonianPhalanx,
    [Card.Mathematics]: Mathematics,
    [Card.MausoleumOfHalicarnassus]: MausoleumOfHalicarnassus,
    [Card.Medicine]: Medicine,
    [Card.NebuchadnezzarII]: NebuchadnezzarII,
    [Card.Pericles]: Pericles,
    [Card.Philosophy]: Philosophy,
    [Card.Piracy]: Piracy,
    [Card.Pompei]: Pompei,
    [Card.Pythagoras]: Pythagoras,
    [Card.RomanLegions]: RomanLegions,
    [Card.Sailing]: Sailing,
    [Card.SpartacusUprising]: SpartacusUprising,
    [Card.Famine2]: Famine2,
    [Card.StatueOfZeus]: StatueOfZeus,
    [Card.Steppes]: Steppes,
    [Card.SunTzu]: SunTzu,
    [Card.TheWheel]: TheWheel,
    [Card.VolcanicEruption2]: VolcanicEruption2,
    [Card.WildIsland]: WildIsland,
    [Card.Writing]: Writing
  }

  backImages = {
    [Age.Prehistory]: PrehistoryBack,
    [Age.Antiquity]: AntiquityBack
  }

  help = CardHelp

  canShortClick(move: MaterialMove, context: ItemContext) {
    return super.canShortClick(move, context) ||
      (isMoveItem(move) && move.itemType === MaterialType.Card && move.itemIndex === context.index
        && move.location.type === LocationType.CivilisationArea && move.location.rotation === true)
  }

  getLocations(item: MaterialItem, context: ItemContext): Location[] {
    return item.location.type === LocationType.CivilisationArea && item.location.z === 0 && item.location.player === context.player
      ? [{ type: LocationType.OnCard, parent: context.index }]
      : []
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context) + (item.location.rotation ? 45 : 0)
  }
}

export const cardDescription = new AlongHistoryCardDescription()
