import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setFightEnemies } from '../../redux/slice/fightEnemiesSlice'
import { disableRootSelect } from '../../redux/slice/rootSelectSlice'
import { displayBattle } from 'redux/slice/battleSlice'
import { EnemyList } from '../../types/data/enemy'
import { createEnemyList } from '../../data/enemyList'
import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
  rootNumber: number
}

const Circle = (props: Props): JSX.Element => {
  const { left, top, rootNumber } = props
  const player = useAppSelector((state) => state.player)
  const enemies = useAppSelector((state) => state.enemies)
  const dispatch = useAppDispatch()

  const battleStart = (): void => {
    // 次のステージを選択した時のみバトルを開始する
    if (player.stage === rootNumber) {
      decisionFightEnemies()
      dispatch(disableRootSelect())
      dispatch(displayBattle())
    }
  }

  const decisionFightEnemies = (): void => {
    const enemyList: EnemyList = createEnemyList(enemies)
    switch (rootNumber) {
      case 0:
        dispatch(setFightEnemies(enemyList.slime))
        break
      case 1:
        dispatch(setFightEnemies(enemyList.gargoyle))
        break
      case 2:
        dispatch(setFightEnemies(enemyList.slimeAndGargoyle))
        break
      case 3:
        dispatch(setFightEnemies(enemyList.slimeAndGargoyle))
        break
      case 4:
        dispatch(setFightEnemies(enemyList.slimeAndGargoyle))
        break
      case 5:
        dispatch(setFightEnemies(enemyList.slimeAndGargoyle))
        break
    }
  }

  return (
    <div
      className={`circle ${player.stage === rootNumber ? "next-stage" : ""}`}
      style={{ left: left + '%', top: top }}
      onClick={battleStart}
    >
    </div>
  )
}

export default Circle
