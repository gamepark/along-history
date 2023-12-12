import { Age } from '@gamepark/along-history/material/Age'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { ItemContext, MaterialContext, TokenDescription } from '@gamepark/react-game'
import { isDeleteItem, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Coin1Head from '../images/tokens/coins/Coin1Head.png'
import Coin1Tail from '../images/tokens/coins/Coin1Tail.png'
import Coin5Head from '../images/tokens/coins/Coin5Head.png'
import Coin5Tail from '../images/tokens/coins/Coin5Tail.png'
import { CoinHelp } from './help/CoinHelp'

class CoinDescription extends TokenDescription {
  images = {
    1: Coin1Head,
    5: Coin5Head
  }

  backImages = {
    1: Coin1Tail,
    5: Coin5Tail
  }

  width = 2 // TODO Or: 2.5
  borderRadius = 1.25

  stockLocation = { type: LocationType.CoinsStock }

  protected getFrontId() {
    return 1 // TODO Or: 5
  }

  protected getBackId() {
    return 1 // TODO Or: 5
  }

  getStaticItems({ rules }: MaterialContext) {
    const currentAge = rules.remind<Age | undefined>(Memory.CurrentAge) ?? Age.Prehistory
    return currentAge === Age.Prehistory ? [] : [{ quantity: 19, location: this.stockLocation }]
  }

  randomFlipCache: Map<number, boolean> = new Map()

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext) {
    const cacheKey = (item.location?.type === LocationType.CoinsStock ? 0 : item.location?.player!) * 100 + ((context as ItemContext).displayIndex ?? 0)
    if (!this.randomFlipCache.has(cacheKey)) {
      this.randomFlipCache.set(cacheKey, Math.random() < 0.5)
    }
    return this.randomFlipCache.get(cacheKey)!
  }

  help = CoinHelp

  canShortClick(move: MaterialMove, { index }: ItemContext) {
    return isDeleteItem(move) && move.itemType === MaterialType.Coin && index === move.itemIndex
  }
}

export const coinDescription = new CoinDescription()