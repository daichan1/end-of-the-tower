import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { recoveryDeck, cardDraw } from '../../redux/slice/playerSlice'
import { drawButtonDisabled } from '../../redux/slice/drawButtonSlice'

const DrawButton = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  const drawButton = useAppSelector((state) => state.drawButton)
  const dispatch = useAppDispatch()

  const onClickDraw = (): void => {
    const drawNum = 5
    let nowNameplateLength = 0
    if (player.deck.length < drawNum) {
      nowNameplateLength = player.deck.length
      dispatch(cardDraw(player.deck.length))
      dispatch(recoveryDeck())
    }
    dispatch(cardDraw(drawNum - nowNameplateLength))
    dispatch(drawButtonDisabled())
  }

  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      onClick={onClickDraw}
      disabled={ drawButton ? true : false }
    >
      ドロー
    </Button>
  )
}

export default DrawButton
