import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { moveAllNameplateToCemetery } from '../../redux/slice/playerSlice'
import { resetDamage, resetDamaged } from '../../redux/slice/fightEnemiesSlice'
import { enemyTurn } from '../../redux/slice/turnSlice'
import { resetPlayerActionCount } from '../../redux/slice/playerActionCountSlice'
import { resetPlayerDamage } from '../../redux/slice/playerDamageSlice'

const TurnEndButton = (): JSX.Element => {
  const turn = useAppSelector((state) => state.turn)
  const dispatch = useAppDispatch()

  const turnEnd = (): void => {
    dispatch(resetPlayerDamage())
    dispatch(resetPlayerActionCount())
    dispatch(enemyTurn())
    dispatch(resetDamage())
    dispatch(resetDamaged())
    dispatch(moveAllNameplateToCemetery())
  }

  return (
    <Button
      variant="contained"
      color="inherit"
      size="small"
      onClick={turnEnd}
      disabled={ turn ? false : true }
    >
      ターン終了
    </Button>
  )
}

export default TurnEndButton
