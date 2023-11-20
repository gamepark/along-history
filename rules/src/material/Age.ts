import { Card, cards } from './Card'

export enum Age {
  Prehistory = 1,
  Antiquity,
  MiddleAges
}

export const AgesCardsListing: Record<Age, Partial<Record<Card, number>>> = {
  [Age.Prehistory]: {
    [Card.Forest]: 2,
    [Card.Hills]: 2,
    [Card.Mountain]: 1,
    [Card.Peninsula]: 1,
    [Card.Lowland]: 1,
    [Card.River]: 2,
    [Card.Swamp]: 2,
    [Card.Valley]: 1,
    [Card.Woodlands]: 2,
    [Card.LascauxCave]: 1,
    [Card.Megaliths]: 3,
    [Card.Stonehenge]: 1,
    [Card.Australopithecus]: 3,
    [Card.Bear]: 1,
    [Card.Crocodile]: 1,
    [Card.CroMagnon]: 1,
    [Card.HomoErectus]: 2,
    [Card.HomoSapiens]: 1,
    [Card.Mammoth]: 1,
    [Card.Neanderthal]: 1,
    [Card.Tiger]: 1,
    [Card.WoollyRhinoceros]: 1,
    [Card.TheFire]: 1,
    [Card.FuneralRites]: 1,
    [Card.Wildcrafting]: 2,
    [Card.Fishing]: 2,
    [Card.Hunting]: 2,
    [Card.Sedentism]: 1,
    [Card.Tools]: 1,
    [Card.Weapons]: 1,
    [Card.Cannibals]: 1,
    [Card.Wolves]: 1,
    [Card.Earthquake]: 1,
    [Card.HarshWinter]: 1,
    [Card.Starving]: 1,
    [Card.VolcanicEruption]: 1
  },
  [Age.Antiquity]: {},
  [Age.MiddleAges]: {}
}

export const prehistoryCards = cards.filter(card => card < 100)
export const antiquityCards = cards.filter(card => card >= 100 && card < 200)
export const middleAgesCards = cards.filter(card => card >= 200)

export const AgesCards: Record<Age, Card[]> = {
  [Age.Prehistory]: prehistoryCards,
  [Age.Antiquity]: antiquityCards,
  [Age.MiddleAges]: middleAgesCards
}

export const getCardAge = (card: Card): Age => Math.ceil(card / 100)