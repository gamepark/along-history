import { Card } from '../Card'
import { CardInfo } from './CardInfo'
import { Australopithecus } from './prehistory/Australopithecus'
import { Bear } from './prehistory/Bear'
import { Cannibals } from './prehistory/Cannibals'
import { Crocodile } from './prehistory/Crocodile'
import { CroMagnon } from './prehistory/CroMagnon'
import { Earthquake } from './prehistory/Earthquake'
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
import { Starving } from './prehistory/Starving'
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
  [Card.Tools]: Tools,
  [Card.Weapons]: Weapons,
  [Card.Cannibals]: Cannibals,
  [Card.Wolves]: Wolves,
  [Card.Earthquake]: Earthquake,
  [Card.HarshWinter]: HarshWinter,
  [Card.Starving]: Starving,
  [Card.VolcanicEruption]: VolcanicEruption
}