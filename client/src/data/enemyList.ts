import { EnemyType } from '../types/model/index'
import { EnemyList, EnemyPattern } from '../types/data/enemy'

export const createEnemyList = (enemies: EnemyType[]): EnemyList => {
  const enemyPattern = floorOneEnemyPattern(enemies)
  const enemyList: EnemyList = {
    stage1: [],
    stage2: [],
    stage3: [],
    stage4: [],
    stage5: [],
    stage6: []
  }
  enemyList.stage1 = enemyList.stage1.concat(enemyPattern.pattern1)
  enemyList.stage2 = enemyList.stage2.concat(enemyPattern.pattern2)
  enemyList.stage3 = enemyList.stage3.concat(enemyPattern.pattern3)
  enemyList.stage4 = enemyList.stage4.concat(enemyPattern.pattern4)
  enemyList.stage5 = enemyList.stage5.concat(enemyPattern.pattern5)
  enemyList.stage6 = enemyList.stage6.concat(enemyPattern.pattern6)
  return enemyList
}

const floorOneEnemyPattern = (enemies: EnemyType[]): EnemyPattern => {
  const enemyPattern: EnemyPattern = {
    pattern1: [],
    pattern2: [],
    pattern3: [],
    pattern4: [],
    pattern5: [],
    pattern6: [],
    pattern7: []
  }
  enemyPattern.pattern1 = enemyPattern.pattern1.concat(searchEnemy(enemies, ["スライム"]))
  enemyPattern.pattern2 = enemyPattern.pattern2.concat(searchEnemy(enemies, ["スライム", "ガーゴイル"]))
  enemyPattern.pattern3 = enemyPattern.pattern3.concat(searchEnemy(enemies, ["グレムリン"]))
  enemyPattern.pattern4 = enemyPattern.pattern4.concat(searchEnemy(enemies, ["盗賊", "盗賊"]))
  enemyPattern.pattern5 = enemyPattern.pattern5.concat(searchEnemy(enemies, ["ガーゴイル", "グレムリン"]))
  enemyPattern.pattern6 = enemyPattern.pattern6.concat(searchEnemy(enemies, ["キメラ"]))
  enemyPattern.pattern7 = enemyPattern.pattern7.concat(searchEnemy(enemies, ["ボススライム"]))
  return enemyPattern
}

const searchEnemy = (enemies: EnemyType[], searchTextList: Array<string>): EnemyType[] => {
  let enemyList: EnemyType[] = []
  searchTextList.forEach((text) => {
    enemyList = enemyList.concat(enemies.filter((enemy) => enemy.name === text))
  })
  return enemyList
}
