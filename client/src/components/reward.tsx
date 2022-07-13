import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { PlayerType ,CardType } from '../types/model'
import Card from '../components/battle/card'
import { addCard, updatePlayerStatus } from '../redux/slice/playerSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableReward } from '../redux/slice/rewardSlice'
import { incrementFloor } from '../redux/slice/floorSlice'
import '../styles/reward/style.scss'

const Reward = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [rewardCard, setRewardCard] = useState<CardType>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    cost: 0,
    cardType: "",
    attack: 0,
    defense: 0,
    actionName: "",
    executionCount: 1,
    effectType: ""
  })

  const player = useAppSelector((state) => state.player)
  const reward = useAppSelector((state) => state.reward)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const selectCard = (card: CardType): void => {
    setRewardCard(card)
    handleOpen()
  }

  const displayRewardCards = (): JSX.Element[] => {
    return reward.displayCards.map((card, index) =>
      <Grid item xs={4} key={index} data-testid='rewardCard'>
        <Card
          width={150}
          height={200}
          imgHeight={75}
          cssClass="reward-card"
          card={card}
          clickCard={selectCard}
        />
      </Grid>
    )
  }

  const addRewardCard = (): void => {
    const card: CardType = {
      id: player.deck.length + 1,
      name: rewardCard.name,
      description: rewardCard.description,
      imageUrl: rewardCard.imageUrl,
      cost: rewardCard.cost,
      cardType: rewardCard.cardType,
      attack: rewardCard.attack,
      defense: rewardCard.defense,
      actionName: rewardCard.actionName,
      executionCount: rewardCard.executionCount,
      effectType: rewardCard.effectType
    }
    dispatch(addCard(card))
    // ボスを倒したら次の階へ
    if (player.stage > 5) {
      const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
      playerObj.hp = playerObj.maxHp
      playerObj.stage = 0
      dispatch(updatePlayerStatus(playerObj))
      dispatch(incrementFloor())
    }
    dispatch(disableReward())
    dispatch(displayRootSelect())
    handleClose()
  }

  const ModalRewardCard = (): JSX.Element => {
    return (
      <Card
          width={200}
          height={250}
          imgHeight={100}
          cssClass="modal-reward-card"
          card={rewardCard}
          clickCard={addRewardCard}
        />
    )
  }

  const onSkipClick = (): void => {
    dispatch(disableReward())
    dispatch(displayRootSelect())
  }

  return (
    <div style={{ display: reward.disabled ? 'none' : '' }} className='reward' data-testid='reward'>

      <Container>

        <div className='reward-message'>
          <Typography variant='h3'>勝利！</Typography>
          <Typography variant='subtitle1'>カードを1枚選択してください</Typography>
        </div>

        <Grid container justifyContent="center" className='reward-cards'>
          { displayRewardCards() }
        </Grid>

        <div className='reward-skip'>
          <Button
            variant="contained"
            onClick={onSkipClick}
          >
            スキップ
          </Button>
        </div>

      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-reward"
      >
        <div id='modal-reward' data-testid='modalRewardCard'>
          <ModalRewardCard />
        </div>
      </Modal>

    </div>
  )
}

export default Reward
