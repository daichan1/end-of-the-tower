import { useAppDispatch, useAppSelector } from '../redux/hooks'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { disableGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'

const GameTitle = (): JSX.Element => {
  const gameTitle = useAppSelector((state) => state.gameTitle)
  const dispatch = useAppDispatch()

  const gameStart = (): void => {
    dispatch(disableGameTitle())
    dispatch(displayRootSelect())
  }

  return (
    <div style={{ display: gameTitle ? 'none' : '' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: 600 }}
      >
        <h1 style={{ marginBottom: 100 }}>End of the Tower</h1>
        <Button
          variant="contained"
          onClick={gameStart}
        >
          ゲームスタート
        </Button>
      </Grid>
    </div>
  )
}

export default GameTitle
