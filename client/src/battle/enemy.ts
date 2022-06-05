import { EnemyType } from '../types/model/index'

export const isExistEnemy = (enemies: EnemyType[]): boolean => {
  return enemies.length > 0 ? true : false
}

export const damaged = (enemy: EnemyType): void => {
  enemy.isDamaged = true
}

export const resetDamaged = (enemies: EnemyType[]): void => {
  enemies.forEach(enemy => enemy.isDamaged = false)
}
