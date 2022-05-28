import { PlayerType, EnemyType } from '../types/model/index'
import { enemyAttack } from '../common/battle'

export const enemyAction = (player: PlayerType, enemies: EnemyType[]): void => {
  enemies.forEach((enemy) => {
    enemyAttack(player, enemy)
  })
}
