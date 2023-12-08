import { Card } from '../Card'
import { Agriculture } from './antiquity/Agriculture'
import { AlexanderTheGreat } from './antiquity/AlexanderTheGreat'
import { AlluvialPlain } from './antiquity/AlluvialPlain'
import { Architecture } from './antiquity/Architecture'
import { Aristotle } from './antiquity/Aristotle'
import { Astronomy } from './antiquity/Astronomy'
import { Attila } from './antiquity/Attila'
import { BarbarianInvasions } from './antiquity/BarbarianInvasions'
import { Bocage } from './antiquity/Bocage'
import { CivilWar } from './antiquity/CivilWar'
import { Cleopatra } from './antiquity/Cleopatra'
import { Coast } from './antiquity/Coast'
import { ColossusOfRhodes } from './antiquity/ColossusOfRhodes'
import { Desert } from './antiquity/Desert'
import { Domestication } from './antiquity/Domestication'
import { Epidemic } from './antiquity/Epidemic'
import { Famine2 } from './antiquity/Famine2'
import { FertilePlain } from './antiquity/FertilePlain'
import { Flood } from './antiquity/Flood'
import { GreatPyramidOfGiza } from './antiquity/GreatPyramidOfGiza'
import { GreatWallOfChina } from './antiquity/GreatWallOfChina'
import { HangingGardensOfBabylon } from './antiquity/HangingGardensOfBabylon'
import { Hannibal } from './antiquity/Hannibal'
import { Hippocrates } from './antiquity/Hippocrates'
import { HorsebackRiding } from './antiquity/HorsebackRiding'
import { IronWorking } from './antiquity/IronWorking'
import { JuliusCaesar } from './antiquity/JuliusCaesar'
import { LighthouseOfAlexandria } from './antiquity/LighthouseOfAlexandria'
import { MacedonianPhalanx } from './antiquity/MacedonianPhalanx'
import { Mathematics } from './antiquity/Mathematics'
import { MausoleumOfHalicarnassus } from './antiquity/MausoleumOfHalicarnassus'
import { Medicine } from './antiquity/Medicine'
import { NebuchadnezzarII } from './antiquity/NebuchadnezzarII'
import { Pericles } from './antiquity/Pericles'
import { Philosophy } from './antiquity/Philosophy'
import { Piracy } from './antiquity/Piracy'
import { Pompei } from './antiquity/Pompei'
import { Pythagoras } from './antiquity/Pythagoras'
import { RomanLegions } from './antiquity/RomanLegions'
import { Sailing } from './antiquity/Sailing'
import { SpartacusUprising } from './antiquity/SpartacusUprising'
import { StatueOfZeus } from './antiquity/StatueOfZeus'
import { Steppes } from './antiquity/Steppes'
import { SunTzu } from './antiquity/SunTzu'
import { TheWheel } from './antiquity/TheWheel'
import { VolcanicEruption2 } from './antiquity/VolcanicEruption2'
import { WildIsland } from './antiquity/WildIsland'
import { Writing } from './antiquity/Writing'
import { CardInfo } from './CardInfo'
import { Australopithecus } from './prehistory/Australopithecus'
import { Bear } from './prehistory/Bear'
import { Cannibals } from './prehistory/Cannibals'
import { Crocodile } from './prehistory/Crocodile'
import { CroMagnon } from './prehistory/CroMagnon'
import { Earthquake } from './prehistory/Earthquake'
import { Famine1 } from './prehistory/Famine1'
import { Fishing } from './prehistory/Fishing'
import { Forest } from './prehistory/Forest'
import { FuneralRites } from './prehistory/FuneralRites'
import { HarshWinter } from './prehistory/HarshWinter'
import { Hills } from './prehistory/Hills'
import { HomoErectus } from './prehistory/HomoErectus'
import { HomoSapiens } from './prehistory/HomoSapiens'
import { Hunting } from './prehistory/Hunting'
import { LascauxCave } from './prehistory/LascauxCave'
import { Lowland } from './prehistory/Lowland'
import { Mammoth } from './prehistory/Mammoth'
import { Megaliths } from './prehistory/Megaliths'
import { Mountain } from './prehistory/Mountain'
import { Neanderthal } from './prehistory/Neanderthal'
import { Peninsula } from './prehistory/Peninsula'
import { River } from './prehistory/River'
import { Sedentism } from './prehistory/Sedentism'
import { Stonehenge } from './prehistory/Stonehenge'
import { Swamp } from './prehistory/Swamp'
import { TheFire } from './prehistory/TheFire'
import { Tiger } from './prehistory/Tiger'
import { Tools } from './prehistory/Tools'
import { Valley } from './prehistory/Valley'
import { VolcanicEruption } from './prehistory/VolcanicEruption'
import { Weapons } from './prehistory/Weapons'
import { Wildcrafting } from './prehistory/Wildcrafting'
import { Wolves } from './prehistory/Wolves'
import { Woodlands } from './prehistory/Woodlands'
import { WoollyRhinoceros } from './prehistory/WoollyRhinoceros'

export const CardsInfo: Record<Card, CardInfo> = {
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
  [Card.VolcanicEruption1]: VolcanicEruption,

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