import { PlayerType, EnemyType, CardType } from '../types/model/index'
import { cardEffect } from '../types/battle/cardEffect'
import { cardEffectList } from './cardEffectList'

export const playerAction = (player: PlayerType, enemies: EnemyType[], card: CardType): void => {
  const cardEffectObj = searchCardEffect(card.actionName)
  if (cardEffectObj === null) {
    console.log("実行できるアクションが存在しません")
    return
  }
  cardEffectObj.execution(player, enemies, card)
}

export const searchCardEffect = (actionName: string): cardEffect | null => {
  const cardEffectObj = cardEffectList.find(item => item.name === actionName)
  if (cardEffectObj === undefined) { return null }
  return cardEffectObj
}

export const isRemainsEnergy = (player: PlayerType, card: CardType): boolean => {
  const diff = player.energy - card.cost
  return diff >= 0 ? true : false
}

export const moveAllNameplateToCemetery = (player: PlayerType): void => {
  player.cemetery = player.cemetery.concat(player.nameplate)
  player.nameplate = []
}

export const returnCardToDeck = (player: PlayerType): void => {
  player.deck = player.deck.concat(player.nameplate)
  player.deck = player.deck.concat(player.cemetery)
  player.nameplate = []
  player.cemetery = []
}

export const recoveryEnergy = (player: PlayerType, energy: number): void => {
  player.energy = energy
}

export const resetPlayerStatus = (player: PlayerType): void => {
  player.defense = 0
}

export const subtractEnergy = (player: PlayerType, cardCost: number): void => {
  player.energy -= cardCost
}

export const moveUsedCardToCemetery = (player: PlayerType, card: CardType): void => {
  player.nameplate.forEach((nameplate, index) => {
    if (nameplate.id === card.id) {
      player.cemetery.push(nameplate)
      player.nameplate.splice(index, 1)
    }
  })
}

export const incrementStage = (player: PlayerType): void => {
  player.stage += 1
}
