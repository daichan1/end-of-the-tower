import { EnemyType } from '../types/model/index'

export const isExistEnemy = (enemies: EnemyType[]): boolean => {
  return enemies.length > 0 ? true : false
}
