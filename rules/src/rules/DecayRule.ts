import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DecayRule extends PlayerTurnRule {
    getPlayerMoves(): MaterialMove[] {
        const moves: MaterialMove[] = []
        const topCards = this.material(MaterialType.Card)
            .location(LocationType.CivilisationArea)
            .player(this.player)
            .location(({ z }) => z === 0)

        for (const location of topCards.getItems().map((item) => item.location)) {
            moves.push(...topCards.location((loc) => loc.x !== location.x).moveItems(location))
        }
        return moves
    }

    afterItemMove(_move: ItemMove): MaterialMove[] {
        return [this.rules().startRule(RuleId.UniversalResource)]
    }
}
