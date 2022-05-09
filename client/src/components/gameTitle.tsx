import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const GameTitle: React.FC = () => {
  return (
    <div>
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
        >
          ゲームスタート
        </Button>
      </Grid>
    </div>
  )
}

export default GameTitle;
