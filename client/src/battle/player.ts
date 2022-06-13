import { PlayerType, EnemyType, CardType } from '../types/model/index'
import { cardEffect } from '../types/battle/cardEffect'
import { cardEffectList } from './cardEffectList'
import { calcDamage, subtractHp, calcBlockDamage } from '../common/battle'

export const playerAttack = (player: PlayerType, enemy: EnemyType, card: CardType): number => {
  const attack = player.attack + card.attack
  const damage = calcDamage(enemy, attack)
  subtractHp(enemy, damage)
  return damage
}

export const playerBlockAttack = (enemy: EnemyType, card: CardType): void => {
  calcBlockDamage(enemy, card.attack)
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

export const recoveryEnergy = (player: PlayerType, energy: number): void => {
  player.energy = energy
}

export const resetDefense = (player: PlayerType): void => {
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

export const nextBattleUpdatePlayerStatus = (player: PlayerType): void => {
  player.stage += 1
  recoveryEnergy(player, 3)
  returnCardToDeck(player)
}

export const initialPlayerStatus = (player: PlayerType): void => {
  player.attack = 0
  resetDefense(player)
  player.stage = 0
  player.hp = player.maxHp
  recoveryEnergy(player, 3)
  returnCardToDeck(player)
}

const returnCardToDeck = (player: PlayerType): void => {
  player.deck = player.deck.concat(player.nameplate)
  player.deck = player.deck.concat(player.cemetery)
  player.nameplate = []
  player.cemetery = []
}
