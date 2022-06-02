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
