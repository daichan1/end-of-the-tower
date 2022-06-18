import { PlayerType, EnemyType } from '../types/model'

export const addBlock = (character: PlayerType | EnemyType, defense: number): void => {
  character.defense += defense
}

export const cardDraw = (player: PlayerType, num: number): void => {
  player.deck.forEach((card, i) => {
    if (i < num) { player.nameplate.push(card) }
  })
  player.deck.splice(0, num)
}
