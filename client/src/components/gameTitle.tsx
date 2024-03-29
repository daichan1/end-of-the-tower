import { useState } from 'react'
import axiosClient from '../api/axios'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import MuiCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { ResPlayerCards } from '../types/api/response'
import { setPlayer, initialDeck } from '../redux/slice/playerSlice'
import { disableGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { setRewardCards } from '../redux/slice/rewardSlice'
import { resCardToCard, getAllPlayerRewardCards } from '../common/reward'
import { initializeAllPlayerCards, initializePlayerUniqueCards } from '../battle/deck'
import { cardsShuffle } from '../common/battle'
import '../styles/gameTitle/style.scss'

const ModalMuiCard = styled(MuiCard)({
  width: "50%",
  height: "50%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
})

const ModalMuiCardHeader = styled(CardHeader)({
  textAlign: "center",
  padding: 15
})

const ModalMuiCardContent = styled(CardContent)({
  height: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})

const attackerImage = "https://end-of-the-tower.s3.ap-northeast-1.amazonaws.com/images/players/attacker.png"
const shooterImage = "https://end-of-the-tower.s3.ap-northeast-1.amazonaws.com/images/players/shooter.png"
const snaiperImage = "https://end-of-the-tower.s3.ap-northeast-1.amazonaws.com/images/players/sniper.png"

const GameTitle = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const cards = useAppSelector((state) => state.cards)
  const gameTitle = useAppSelector((state) => state.gameTitle)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const playerSelect = (): void => handleOpen()

  const gameStart = (playerName: string): void => {
    getPlayer(playerName)
    dispatch(disableGameTitle())
    dispatch(displayRootSelect())
    handleClose()
  }

  const getPlayer = async (playerName: string): Promise<void> => {
    await axiosClient.get(`/v1/players/${playerName}`)
    .then(res => {
      const resData: ResPlayerCards = res.data
      const defaultAllPlayerCards = initializeAllPlayerCards(cards)
      const defaultPlayerUniqueCards = initializePlayerUniqueCards(resData.player ,resData.cards)
      const allPlayerRewardCards = getAllPlayerRewardCards(cards)
      const playerUniqueCards = resCardToCard(resData.cards)
      let defaultDeck = defaultAllPlayerCards.concat(defaultPlayerUniqueCards)
      defaultDeck = cardsShuffle(defaultDeck)
      const rewardCards = allPlayerRewardCards.concat(playerUniqueCards)
      dispatch(setRewardCards(rewardCards))
      dispatch(setPlayer(resData.player))
      dispatch(initialDeck(defaultDeck))
    })
    .catch(error => {
      console.log("プレイヤーの取得に失敗しました")
    })
  }

  return (
    <div style={{ display: gameTitle ? 'none' : '' }} className='game-title'>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: 600 }}
      >
        <h1 className='title'>End of the Tower</h1>
        <Button
          variant="contained"
          onClick={playerSelect}
        >
          ゲームスタート
        </Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-game-title"
      >
        <div id='modal-game-title'>
          <ModalMuiCard>
            <ModalMuiCardHeader title="キャラクターを選択してください" />
            <ModalMuiCardContent>
              <Grid container justifyContent="center">
                <Grid item xs={4} className='player'>
                  <div>
                    <img src={attackerImage} alt="アタッカー" className='player-img' />
                  </div>
                  <Button
                    variant="contained"
                    onClick={() => gameStart("アタッカー")}
                  >
                    アタッカー
                  </Button>
                </Grid>
                <Grid item xs={4} className='player'>
                  <div>
                    <img src={shooterImage} alt="シューター" className='player-img' />
                  </div>
                  <Button
                    variant="contained"
                    onClick={() => gameStart("シューター")}
                  >
                    シューター
                  </Button>
                </Grid>
                <Grid item xs={4} className='player'>
                  <div>
                    <img src={snaiperImage} alt="スナイパー" className='player-img' />
                  </div>
                  <Button
                    variant="contained"
                    onClick={() => gameStart("スナイパー")}
                  >
                    スナイパー
                  </Button>
                </Grid>
              </Grid>
            </ModalMuiCardContent>
          </ModalMuiCard>
        </div>
      </Modal>
    </div>
  )
}

export default GameTitle
