import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setFightEnemies } from '../../redux/slice/fightEnemiesSlice'
import { disableRootSelect } from '../../redux/slice/rootSelectSlice'
import { displayBattle } from '../../redux/slice/battleSlice'
import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
  rootNumber: number
}

const Circle = (props: Props): JSX.Element => {
  const { left, top, rootNumber } = props
  const player = useAppSelector((state) => state.player)
  const enemyList = useAppSelector((state) => state.enemyList)
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
    switch (rootNumber) {
      case 0:
        dispatch(setFightEnemies(enemyList.stage1))
        break
      case 1:
        dispatch(setFightEnemies(enemyList.stage2))
        break
      case 2:
        dispatch(setFightEnemies(enemyList.stage3))
        break
      case 3:
        dispatch(setFightEnemies(enemyList.stage4))
        break
      case 4:
        dispatch(setFightEnemies(enemyList.stage5))
        break
      case 5:
        dispatch(setFightEnemies(enemyList.stage6))
        break
    }
  }

  return (
    <div>
      <button
      className={
        `circle
        ${player.stage === rootNumber ? "next-stage" : ""}
        ${rootNumber < player.stage ? "clear" : ""}
        `}
      style={{ left: left + '%', top: top }}
      onClick={battleStart}
      />
    </div>
  )
}

export default Circle
