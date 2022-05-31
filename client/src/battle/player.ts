import { PlayerType, EnemyType, CardType } from '../types/model/index'
import { cardEffect } from '../types/battle/cardEffect'
import { deckShuffle } from '../common/battle'
import { cardEffectList } from './cardEffectList'

export const playerAction = (player: PlayerType, enemies: EnemyType[], card: CardType): void => {
  const cardEffectObj = searchCardEffect(card.actionName)
  if (cardEffectObj === null) {
    console.log("実行できるアクションが存在しません")
    return
  }
  cardEffectObj.execution(player, enemies, card)

  if (isRemainsEnergy(player, card)) {
    subtractEnergy(player, card)
    moveNameplateToCemetery(player, card)
  } else {
    console.log("エナジーが不足しています")
  }
}

export const cardDraw = (player: PlayerType, drawNum: number): void => {
  const nameplate: CardType[] = []
  if (player.deck.length < drawNum) { recoveryDeck(player) }
  player.deck.forEach((card, i) => {
    if (i < drawNum) {
      nameplate.push(card)
    }
  })
  player.deck.splice(0, drawNum)
  player.nameplate = player.nameplate.concat(nameplate)
}

export const recoveryEnergy = (player: PlayerType, maxEnergy: number): void => {
  player.energy = maxEnergy
}

export const resetPlayerStatus = (player: PlayerType): void => {
  player.defense = 0
}

export const returnCardToDeck = (player: PlayerType): void => {
  player.deck = player.deck.concat(player.nameplate)
  player.deck = player.deck.concat(player.cemetery)
  player.nameplate = []
  player.cemetery = []
}

const searchCardEffect = (actionName: string): cardEffect | null => {
  const cardEffectObj = cardEffectList.find(item => item.name === actionName)
  if (cardEffectObj === undefined) { return null }
  return cardEffectObj
}

const isRemainsEnergy = (player: PlayerType, card: CardType): boolean => {
  const diff = player.energy - card.cost
  return diff >= 0 ? true : false
}

const subtractEnergy = (player: PlayerType, card: CardType): void => {
  player.energy -= card.cost
}

const moveNameplateToCemetery = (player: PlayerType, card: CardType): void => {
  player.nameplate.forEach((nameplate, index) => {
    if (nameplate.id === card.id) {
      player.cemetery.push(nameplate)
      player.nameplate.splice(index, 1)
    }
  })
}

const recoveryDeck = (player: PlayerType): void => {
  player.deck = player.deck.concat(player.cemetery)
  player.deck = deckShuffle(player.deck)
  player.cemetery = []
}
