/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Achievement, getAchievementValue } from '@gamepark/along-history/material/Achievement'
import { Card } from '@gamepark/along-history/material/Card'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { DiceType, ResourceDice } from '@gamepark/along-history/material/Dices'
import { DiceSymbol } from '@gamepark/along-history/material/DiceSymbol'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { AchievementsRule } from '@gamepark/along-history/rules/AchievementsRule'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import {
  isCustomMoveType,
  isMoveItemType,
  isRoll,
  isRollItemType,
  isSelectItemType,
  isStartRule,
  MaterialGame,
  MaterialMove,
  MaterialMoveRandomized
} from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Population1 from '../images/dices/population/Population1.jpg'
import Population2 from '../images/dices/population/Population2.jpg'
import Population3 from '../images/dices/population/Population3.jpg'
import Culture from '../images/dices/resources/Culture.jpg'
import Ingenuity from '../images/dices/resources/Ingenuity.jpg'
import Strength from '../images/dices/resources/Strength.jpg'
import War from '../images/dices/special/War.jpg'
import { boardDescription } from '../material/BoardDescription'
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
          <Picture src={Population1} css={[inlineIcon, rounded]}/>
          <Picture src={Strength} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: 45, y: 0 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reroll"><strong/><em/>
          <Picture src={Ingenuity} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: -10, y: 25 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).location(l => l.x === 3 || l.x === 5),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 5 && move.location.type === LocationType.DiscardTile
      }
    },
    {
      move: {
        filter: (move: MaterialMove) => isRollItemType(MaterialType.Dice)(move) && move.itemIndex === 3,
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            move.location.rotation = ResourceDice.indexOf(DiceSymbol.Ingenuity)
          }
        }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).id(DiceType.Resource)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reroll-success">
          <strong/><em/>
          <Picture src={Ingenuity} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: -10, y: 25 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).id(DiceType.Resource)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.trade1">
          <strong/><em/>
          <Picture src={Population1} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: 10, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).index(1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Hunting)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 1 && move.location.type === LocationType.DiscardTile
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).index(1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Hunting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isSelectItemType(MaterialType.Card)(move)) return false
          const selectedCard = this.material(game, MaterialType.Card).getItem<CardId>(move.itemIndex)
          return selectedCard?.id?.front === Card.Tiger || selectedCard?.id?.front === Card.Hunting
        }
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).index(1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Hunting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isSelectItemType(MaterialType.Card)(move)) return false
          const selectedCard = this.material(game, MaterialType.Card).getItem<CardId>(move.itemIndex)
          return selectedCard?.id?.front === Card.Tiger || selectedCard?.id?.front === Card.Hunting
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.forest"><strong/><em/></Trans>,
        position: { x: 10, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Forest)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Forest
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.special-dice">
          <strong/><em/>
          <Picture src={Population2} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: -20, y: -20 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Dice).id(DiceType.Special)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.forest.pay"><strong/><em/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).location(LocationType.PlayerResources),
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Forest),
        this.material(game, MaterialType.DiscardTile)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && (move.itemIndex === 0 || move.itemIndex === 2)
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).location(LocationType.PlayerResources),
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Forest),
        this.material(game, MaterialType.DiscardTile)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && (move.itemIndex === 0 || move.itemIndex === 2)
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).location(LocationType.PlayerResources),
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Forest),
        this.material(game, MaterialType.DiscardTile)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 4
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice).location(LocationType.PlayerResources),
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Forest),
        this.material(game, MaterialType.DiscardTile)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 3
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.action1.pass"><strong/><em/></Trans> },
      move: { filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war1.pass"><strong/><em/></Trans> },
      move: { filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.event-area.refill"><strong/><em/></Trans>,
        position: { x: 0, y: -32 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).location(LocationType.EventArea).player(game.players[0])
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.success"><strong/><em/></Trans>,
        position: { x: -18, y: 15 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        this.material(game, MaterialType.AchievementToken).location(LocationType.AchievementsBoard),
        this.material(game, MaterialType.CivilisationToken),
        this.location(LocationType.CivilisationArea).player(game.players[0])
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.success.take"><strong/><em/></Trans>,
        position: { x: -18, y: 15 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        this.material(game, MaterialType.AchievementToken).location(LocationType.AchievementsBoard).id<Achievement>(achievement =>
          new AchievementsRule(game, type => this.material(game, type)).canAchieve(achievement)
        ),
        this.material(game, MaterialType.CivilisationToken),
        this.location(LocationType.CivilisationArea).player(game.players[0])
      ],
      move: {
        filter: isMoveItemType(MaterialType.CivilisationToken)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.success.vp"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.turn1.over"><strong/><em/></Trans> },
      move: {}
    },
    {
      popup: { text: () => <Trans defaults="tuto.result-tokens"><strong/><em/></Trans> },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Dice),
        this.material(game, MaterialType.ResultToken)
      ]
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move) &&
          this.material(game, move.itemType).getItem(move.itemIndex)?.id === DiceSymbol.Population1
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Tiger
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Hunting
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player2.1"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea &&
          this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Hunting
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isMoveItemType(MaterialType.CivilisationToken)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player2.2"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round1.player3.1"><strong/><em/></Trans>,
        position: { x: -20, y: 0 }
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea &&
          this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Fishing
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move)
          && this.material(game, MaterialType.ResultToken).getItem<DiceSymbol>(move.itemIndex)?.id === DiceSymbol.Population2
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move)
          && this.material(game, MaterialType.ResultToken).getItem<DiceSymbol>(move.itemIndex)?.id === DiceSymbol.Population2
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.CivilisationToken)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.player3.2"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round1.over"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = 5
                break
              case 1:
                move.location.rotation = 4
                break
              case 2:
                move.location.rotation = 1
                break
              case 3:
                move.location.rotation = 5
                break
            }
          }
        }
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea &&
          this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.HomoErectus
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex <= 3
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex <= 3
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex <= 3
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex <= 3
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isStartRule
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.player1"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Blue,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round2.player2"><strong/><em/></Trans>,
        position: { x: -20, y: 0 }
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move)
          && this.material(game, MaterialType.ResultToken).getItem<DiceSymbol>(move.itemIndex)?.id === DiceSymbol.Population1
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Mammoth
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.FuneralRites
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.FuneralRites
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.ResultToken)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isStartRule
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.player2.over"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.you"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.trade2">
          <strong/><em/>
          <Picture src={Population1} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: 0, y: 32 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.ResultToken).player(PlayerColor.Green).id(DiceSymbol.Population1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Wildcrafting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move)
          && this.material(game, MaterialType.ResultToken).getItem<DiceSymbol>(move.itemIndex)?.id === DiceSymbol.Population1
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.ResultToken).player(PlayerColor.Green).id(DiceSymbol.Population1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Wildcrafting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Tiger
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.ResultToken).player(PlayerColor.Green).id(DiceSymbol.Population1),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Tiger || id.front === Card.Wildcrafting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isSelectItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Wildcrafting
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.wildcrafting"><strong/><em/></Trans>,
        position: { x: 40, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Wildcrafting)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Wildcrafting
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.bonus.forest"><strong/><em/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Forest)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Forest
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.wildcrafting.pay">
          <strong/><em/>
          <Picture src={Population3} css={[inlineIcon, rounded]}/>
        </Trans>
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).id<CardId>(id => id.front === Card.Wildcrafting),
        this.material(game, MaterialType.ResultToken).location(LocationType.PlayerResources).id(DiceSymbol.Population3)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.ResultToken)(move) &&
          this.material(game, move.itemType).getItem(move.itemIndex)?.id === DiceSymbol.Population3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.bonus.wildcrafting">
          <strong/><em/>
          <Picture src={Population1} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).player(PlayerColor.Green).id<CardId>(id =>
          id.front === Card.Wildcrafting || id.front === Card.Australopithecus
        )
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Australopithecus
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).player(PlayerColor.Green).id<CardId>(id =>
          id.front === Card.Wildcrafting || id.front === Card.Australopithecus
        ),
        this.material(game, MaterialType.ResultToken).location(LocationType.PlayerResources)
      ],
      move: {
        filter: (move: MaterialMove) => !isMoveItemType(MaterialType.UniversalResource)(move)
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).player(PlayerColor.Green).id<CardId>(id =>
          id.front === Card.Wildcrafting || id.front === Card.Australopithecus
        ),
        this.material(game, MaterialType.ResultToken).location(LocationType.PlayerResources)
      ],
      move: {
        filter: (move: MaterialMove) => !isMoveItemType(MaterialType.UniversalResource)(move)
      }
    },
    {
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).player(PlayerColor.Green).id<CardId>(id =>
          id.front === Card.Wildcrafting || id.front === Card.Australopithecus
        ),
        this.material(game, MaterialType.ResultToken).location(LocationType.PlayerResources)
      ],
      move: {
        filter: (move: MaterialMove) => !isMoveItemType(MaterialType.UniversalResource)(move)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.round2.actions.over"><strong/><em/></Trans> },
      move: { filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.universal">
          <strong/><em/>
          <Picture src={Strength} css={[inlineIcon, rounded]}/>
          <Picture src={Ingenuity} css={[inlineIcon, rounded]}/>
          <Picture src={Culture} css={[inlineIcon, rounded]}/>
          <Picture src={Population3} css={[inlineIcon, rounded]}/>
        </Trans>,
        position: { x: -15, y: -28 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.UniversalResource).player(PlayerColor.Green)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.war2.pass"><strong/><em/></Trans>,
        position: { x: -15, y: -20 }
      },
      move: { filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.success2"><strong/><em/></Trans>,
        position: { x: -18, y: 15 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        this.material(game, MaterialType.AchievementToken).location(LocationType.AchievementsBoard).id<Achievement>(achievement =>
          getAchievementValue(achievement) === 2 && new AchievementsRule(game, type => this.material(game, type)).canAchieve(achievement)
        ),
        this.material(game, MaterialType.CivilisationToken),
        this.location(LocationType.CivilisationArea).player(game.players[0])
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.CivilisationToken)(move) && move.location.x === 2
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.1"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.decay.2"><strong/><em/></Trans> },
      focus: (game: MaterialGame) => [
        this.location(LocationType.CivilisationArea).player(game.players[0]),
        this.material(game, MaterialType.Card).location(LocationType.CivilisationArea).player(PlayerColor.Green)
      ],
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move)
          && this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Australopithecus
      }
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
      popup: { text: () => <Trans defaults="tuto.round2.pass"><strong/><em/></Trans> },
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = 1
                break
              case 1:
                move.location.rotation = 1
                break
              case 2:
                move.location.rotation = 0
                break
              case 3:
                move.location.rotation = 2
                break
              case 4:
                move.location.rotation = 2
                break
              case 5:
                move.location.rotation = 3
                break
            }
          }
        }
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea &&
          this.material(game, move.itemType).getItem<CardId>(move.itemIndex)?.id?.front === Card.Tiger
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex === 3
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Dice)(move) && move.itemIndex < 3
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.Dice)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.Dice)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.Dice)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isMoveItemType(MaterialType.Card)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.ChoosePlayer)(move) && move.data === PlayerColor.Green
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.war.1"><strong/><em/>
          <Picture src={War} css={[inlineIcon, rounded]}/>
        </Trans>
      }
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
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = 4
                break
              case 1:
                move.location.rotation = 5
                break
              case 2:
                move.location.rotation = 0
                break
            }
          }
        }
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.5"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.6"><strong/><em/></Trans> },
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = 4
                break
              case 1:
                move.location.rotation = 3
                break
              case 2:
                move.location.rotation = 0
                break
            }
          }
        }
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.7"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.war.8"><strong/><em/></Trans> }
    },
    {
      move: {
        player: PlayerColor.Red,
        filter: isStartRule
      }
    },
    {
      move: { player: PlayerColor.Red }
    },
    {
      popup: { text: () => <Trans defaults="tuto.turn3"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.calamity"><strong/><em/></Trans>,
        position: { x: 48, y: 0 }
      },
      focus: (game: MaterialGame) =>
        this.material(game, MaterialType.Card).location(LocationType.EventArea).id<CardId>(id => id.front === Card.Wolves)
    },
    {
      popup: { text: () => <Trans defaults="tuto.universal.gain1"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.universal.gain2"><strong/><em/></Trans>,
        position: { x: -20, y: 0 }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.age-end"><strong/><em/></Trans>,
        position: { x: -15, y: 22 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        this.material(game, MaterialType.AchievementToken).id<Achievement>(id => getAchievementValue(id) === 7),
        this.material(game, MaterialType.CivilisationToken),
        this.location(LocationType.CivilisationArea).player(game.players[0])
      ]
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
