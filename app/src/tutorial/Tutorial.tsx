/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/along-history/material/Card'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { DiceType } from '@gamepark/along-history/material/Dices'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isRollItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Population1 from '../images/dices/population/Population1.jpg'
import Strength from '../images/dices/resources/Strength.jpg'
import { TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial {
  version = 1
  options = { players: [{ id: PlayerColor.Green }, { id: PlayerColor.Blue }, { id: PlayerColor.Red }] }
  setup = new TutorialSetup()

  players = [
    { id: PlayerColor.Green },
    {
      id: PlayerColor.Blue,
      name: 'NostroBoss',
      avatar: {
        topType: TopType.ShortHairDreads01,
        hairColor: '#6F635F',
        facialHairType: FacialHairType.BeardLight,
        facialHairColor: '#6F635F',
        clotheType: ClotheType.GraphicShirt,
        clotheColor: ClotheColorName.Blue03,
        graphicType: GraphicType.Diamond,
        eyeType: EyeType.Default,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Default,
        skinColor: SkinColor.Light
      }
    },
    {
      id: PlayerColor.Red,
      name: 'Cécile',
      avatar: {
        topType: TopType.LongHairCurvy,
        hairColor: HairColorName.BlondeGolden,
        facialHairType: FacialHairType.Blank,
        clotheType: ClotheType.ShirtScoopNeck,
        clotheColor: ClotheColorName.Red,
        eyeType: EyeType.Squint,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Tongue,
        skinColor: SkinColor.Pale
      }
    }
  ]

  steps: TutorialStep[] = [
    {
      popup: { text: () => <Trans defaults="tuto.welcome"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.options"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.setup"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.goal"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.event-area"><strong/><em/></Trans>,
        position: { x: 0, y: -32 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).location(LocationType.EventArea).player(game.players[0])
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round1"><strong/><em/></Trans>,
        position: { x: 0, y: -28 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.dice"><strong/><em/></Trans>,
        position: { x: 0, y: -28 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pop-dice"><strong/><em/></Trans>,
        position: { x: 0, y: -28 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).id(id => id !== DiceType.Special)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.card-cost">
          <strong/><em/>
          <Picture src={Strength} css={[inlineIcon, rounded]}/>
          <Picture src={Population1} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: 45, y: 0 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reroll"><strong/><em/></Trans>,
        position: { x: -10, y: 25 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).location(l => l.x === 3 || l.x === 5),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 5 && move.location.type === LocationType.DiscardTile
      }
    },
    {
      move: {
        filter: (move: MaterialMove) => isRollItemType(MaterialType.Dice)(move) && move.itemIndex === 3
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.reroll-success"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.trade1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.forest"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.special-dice"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.forest.pay"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.action1.pass"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war1.pass"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.success"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.success.land"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.success.vp"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.turn1.over"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.result-tokens"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player2.1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player2.2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player3.1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player3.2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.over"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.player2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.you"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.trade2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.wildcrafting"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.bonus.forest"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.wildcrafting.pay"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.bonus.wildcrafting"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.actions.over"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.universal"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war2.pass"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.success2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.3"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.4"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.5"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.pass"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.3"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.4"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.5"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.6"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.7"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.8"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.turn3"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.universal.gain1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.universal.gain2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.age-end"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.good-luck"><strong/><em/></Trans> }
    }
  ]
}

const inlineIcon = css`
  height: 1.2em;
  vertical-align: bottom;
`

const rounded = css`
  border-radius: 15%;
`
