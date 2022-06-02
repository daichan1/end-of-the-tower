import { EnemyType } from '../types/model/index'
import { isRemainsHp } from '../common/battle'

export const checkRemainingHp = (enemies: EnemyType[]): void => {
  enemies.forEach((enemy, index) => {
    if (!isRemainsHp(enemy)) {
      enemies.splice(index, 1)
    }
  })
}

export const isExistEnemy = (enemies: EnemyType[]): boolean => {
  return enemies.length > 0 ? true : false
}
