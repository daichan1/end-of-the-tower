import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../redux/hooks'

const theme = createTheme()

const PlayerTurn = styled(Paper)({
  backgroundColor: "#009688",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const EnemyTurn = styled(Paper)({
  backgroundColor: "#d50000",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const DisplayTurn = (): JSX.Element => {
  const turn = useAppSelector((state) => state.turn)
  if (turn) {
    return <PlayerTurn elevation={1} data-testid='playerTurn'>プレイヤーのターン</PlayerTurn>
  } else {
    return <EnemyTurn elevation={1} data-testid='enemyTurn'>敵のターン</EnemyTurn>
  }
}

export default DisplayTurn
