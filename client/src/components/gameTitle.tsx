import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

type Props = {
  disable: boolean
  onClick: () => void
}

const GameTitle: React.FC<Props> = (props) => {
  const { disable, onClick } = props

  return (
    <div style={{ display: disable ? 'none' : '' }}>
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
          onClick={onClick}
        >
          ゲームスタート
        </Button>
      </Grid>
    </div>
  )
}

export default GameTitle
