/** @jsxImportSource @emotion/react */
import { Age } from '@gamepark/along-history/material/Age'
import { Card } from '@gamepark/along-history/material/Card'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItem, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
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
import Alchemy from '../images/cards/middle-ages/fr/Alchemy.jpg'
import Alembic from '../images/cards/middle-ages/fr/Alembic.jpg'
import Alhambra from '../images/cards/middle-ages/fr/Alhambra.jpg'
import AlKhawarizmi from '../images/cards/middle-ages/fr/AlKhawarizmi.jpg'
import Armor from '../images/cards/middle-ages/fr/Armor.jpg'
import Artillery from '../images/cards/middle-ages/fr/Artillery.jpg'
import Astrolabe from '../images/cards/middle-ages/fr/Astrolabe.jpg'
import Avicenna from '../images/cards/middle-ages/fr/Avicenna.jpg'
import Barony from '../images/cards/middle-ages/fr/Barony.jpg'
import BlackDeath from '../images/cards/middle-ages/fr/BlackDeath.jpg'
import Camelot from '../images/cards/middle-ages/fr/Camelot.jpg'
import Castle from '../images/cards/middle-ages/fr/Castle.jpg'
import Charlemagne from '../images/cards/middle-ages/fr/Charlemagne.jpg'
import Chivalry from '../images/cards/middle-ages/fr/Chivalry.jpg'
import Cholera from '../images/cards/middle-ages/fr/Cholera.jpg'
import Compass from '../images/cards/middle-ages/fr/Compass.jpg'
import County from '../images/cards/middle-ages/fr/County.jpg'
import Crossbow from '../images/cards/middle-ages/fr/Crossbow.jpg'
import Duchy from '../images/cards/middle-ages/fr/Duchy.jpg'
import Famine3 from '../images/cards/middle-ages/fr/Famine3.jpg'
import Heresy from '../images/cards/middle-ages/fr/Heresy.jpg'
import HimejiCastle from '../images/cards/middle-ages/fr/HimejiCastle.jpg'
import Jerusalem from '../images/cards/middle-ages/fr/Jerusalem.jpg'
import JoanOfArc from '../images/cards/middle-ages/fr/JoanOfArc.jpg'
import KingArthur from '../images/cards/middle-ages/fr/KingArthur.jpg'
import Kingdom from '../images/cards/middle-ages/fr/Kingdom.jpg'
import LeCid from '../images/cards/middle-ages/fr/LeCid.jpg'
import Longbow from '../images/cards/middle-ages/fr/Longbow.jpg'
import Mangonel from '../images/cards/middle-ages/fr/Mangonel.jpg'
import MarcoPolo from '../images/cards/middle-ages/fr/MarcoPolo.jpg'
import Mill from '../images/cards/middle-ages/fr/Mill.jpg'
import MinamotoNoYoritomo from '../images/cards/middle-ages/fr/MinamotoNoYoritomo.jpg'
import NotreDame from '../images/cards/middle-ages/fr/NotreDame.jpg'
import Obscurantism from '../images/cards/middle-ages/fr/Obscurantism.jpg'
import Parchment from '../images/cards/middle-ages/fr/Parchment.jpg'
import Plough from '../images/cards/middle-ages/fr/Plough.jpg'
import Poison from '../images/cards/middle-ages/fr/Poison.jpg'
import RichardTheLionheart from '../images/cards/middle-ages/fr/RichardTheLionheart.jpg'
import RobinHood from '../images/cards/middle-ages/fr/RobinHood.jpg'
import SaintThomasAquinas from '../images/cards/middle-ages/fr/SaintThomasAquinas.jpg'
import Saladin from '../images/cards/middle-ages/fr/Saladin.jpg'
import Saxons from '../images/cards/middle-ages/fr/Saxons.jpg'
import TemplarOrder from '../images/cards/middle-ages/fr/TemplarOrder.jpg'
import TheCrusades from '../images/cards/middle-ages/fr/TheCrusades.jpg'
import Tithe from '../images/cards/middle-ages/fr/Tithe.jpg'
import TowerOfPisa from '../images/cards/middle-ages/fr/TowerOfPisa.jpg'
import Vikings from '../images/cards/middle-ages/fr/Vikings.jpg'
import WilliamTheConqueror from '../images/cards/middle-ages/fr/WilliamTheConqueror.jpg'
import WilliamWallace from '../images/cards/middle-ages/fr/WilliamWallace.jpg'
import MiddleAgesBack from '../images/cards/middle-ages/MiddleAgesBack.jpg'
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
    [Card.Writing]: Writing,

    [Card.Alchemy]: Alchemy,
    [Card.Alembic]: Alembic,
    [Card.Alhambra]: Alhambra,
    [Card.AlKhawarizmi]: AlKhawarizmi,
    [Card.Armor]: Armor,
    [Card.Artillery]: Artillery,
    [Card.Astrolabe]: Astrolabe,
    [Card.Avicenna]: Avicenna,
    [Card.Barony]: Barony,
    [Card.BlackDeath]: BlackDeath,
    [Card.Camelot]: Camelot,
    [Card.Castle]: Castle,
    [Card.Charlemagne]: Charlemagne,
    [Card.Chivalry]: Chivalry,
    [Card.Cholera]: Cholera,
    [Card.Compass]: Compass,
    [Card.County]: County,
    [Card.Crossbow]: Crossbow,
    [Card.Duchy]: Duchy,
    [Card.Famine3]: Famine3,
    [Card.Heresy]: Heresy,
    [Card.HimejiCastle]: HimejiCastle,
    [Card.Jerusalem]: Jerusalem,
    [Card.JoanOfArc]: JoanOfArc,
    [Card.KingArthur]: KingArthur,
    [Card.Kingdom]: Kingdom,
    [Card.LeCid]: LeCid,
    [Card.Longbow]: Longbow,
    [Card.Mangonel]: Mangonel,
    [Card.MarcoPolo]: MarcoPolo,
    [Card.Mill]: Mill,
    [Card.MinamotoNoYoritomo]: MinamotoNoYoritomo,
    [Card.NotreDame]: NotreDame,
    [Card.Obscurantism]: Obscurantism,
    [Card.Parchment]: Parchment,
    [Card.Plough]: Plough,
    [Card.Poison]: Poison,
    [Card.RichardTheLionheart]: RichardTheLionheart,
    [Card.RobinHood]: RobinHood,
    [Card.SaintThomasAquinas]: SaintThomasAquinas,
    [Card.Saladin]: Saladin,
    [Card.Saxons]: Saxons,
    [Card.TemplarOrder]: TemplarOrder,
    [Card.TheCrusades]: TheCrusades,
    [Card.Tithe]: Tithe,
    [Card.TowerOfPisa]: TowerOfPisa,
    [Card.Vikings]: Vikings,
    [Card.WilliamTheConqueror]: WilliamTheConqueror,
    [Card.WilliamWallace]: WilliamWallace
  }

  backImages = {
    [Age.Prehistory]: PrehistoryBack,
    [Age.Antiquity]: AntiquityBack,
    [Age.MiddleAges]: MiddleAgesBack
  }

  help = CardHelp

  canShortClick(move: MaterialMove, context: ItemContext) {
    return super.canShortClick(move, context) ||
      (isMoveItem(move) && move.itemType === MaterialType.Card && move.itemIndex === context.index
        && move.location.type === LocationType.CivilisationArea && move.location.rotation === true)
      || (isDeleteItemType(MaterialType.Card)(move) && move.itemIndex === context.index)
  }

  stockLocation = { type: LocationType.Discard }

  getDropLocations(item: MaterialItem, move: MaterialMove, context: ItemContext): Location[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.itemIndex === context.index
      && move.location.type === LocationType.CivilisationArea && move.location.x !== undefined) {
      const card = context.rules.material(MaterialType.Card).location(LocationType.CivilisationArea).player(context.player)
        .location(l => l.x === move.location.x && l.z === 0)
      if (card.length) return [{ type: LocationType.OnCard, parent: card.getIndex() }]
    }
    return super.getDropLocations(item, move, context)
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext) {
    return item.location?.type === LocationType.Deck || super.isFlippedOnTable(item, context)
  }
}

export const cardDescription = new AlongHistoryCardDescription()
