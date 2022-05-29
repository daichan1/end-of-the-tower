import { EnemyType } from '../types/model/index'
import { EnemyList } from '../types/data/enemy'

export const createEnemyList = (enemies: EnemyType[]): EnemyList => {
  const enemyList: EnemyList = {
    slime: [],
    gargoyle: [],
    slimeAndGargoyle: []
  }
  enemyList.slime = enemyList.slime.concat(searchEnemy(enemies, ["スライム"]))
  enemyList.gargoyle = enemyList.gargoyle.concat(searchEnemy(enemies, ["ガーゴイル"]))
  enemyList.slimeAndGargoyle = enemyList.slimeAndGargoyle.concat(searchEnemy(enemies, ["スライム", "ガーゴイル"]))
  return enemyList
}

const searchEnemy = (enemies: EnemyType[], searchTextList: Array<string>): EnemyType[] => {
  let enemyList: EnemyType[] = []
  searchTextList.forEach((text) => {
    enemyList = enemyList.concat(enemies.filter((enemy) => enemy.name === text))
  })
  return enemyList
}
