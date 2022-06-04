import { PlayerType, EnemyType, CardType } from '../types/model'
import { cardEffect } from '../types/battle/cardEffect'
import { playerAttack, addBlock } from '../common/battle'

export const cardEffectList: cardEffect[] = [
  {
    name: "strike",
    execution: (player: PlayerType, enemies: EnemyType[], card: CardType) => strike(player, enemies[0], card)
  },
  {
    name: "protection",
    execution: (player: PlayerType, enemies: EnemyType[], card: CardType) => protection(player, card)
  }
]

const strike = (player: PlayerType, enemy: EnemyType, card: CardType): void => {
  playerAttack(player, enemy, card)
}

const protection = (player: PlayerType, card: CardType): void => {
  addBlock(player, card.defense)
}
