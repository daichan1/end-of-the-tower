import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import MuiCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { CardType, CardBaseType } from '../types/model'
import { addCard } from '../redux/slice/playerSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableReward } from '../redux/slice/rewardSlice'
import playerImg from '../images/player.png'
import '../styles/reward/style.scss'

const CustomMuiCard = styled(MuiCard)({
  width: 125,
  height: 175,
  margin: "0 auto"
})

const CustomCardHeader = styled(CardHeader)({
  color: "white",
  backgroundColor: "black",
  height: 30
})

const CardCost = styled(Avatar)({
  width: 20,
  height: 20,
  backgroundColor: "#42a5f5"
})

const Reward = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [rewardCard, setRewardCard] = useState<CardBaseType>({
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

  const selectCard = (card: CardBaseType): void => {
    setRewardCard(card)
    handleOpen()
  }

  const displayRewardCards = (): JSX.Element[] => {
    return reward.displayCards.map((card, index) =>
      <Grid item xs={4} key={index}>
        <CustomMuiCard onClick={() => selectCard(card)}>
          <CustomCardHeader
            disableTypography
            subheader={<Typography variant="body2">{card.name}</Typography>}
            sx={{ padding: 1 }}
            avatar={<CardCost>{card.cost}</CardCost>}
          />
          <CardMedia
            component="img"
            height="55"
            image={playerImg}
            alt="カード"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
        </CustomMuiCard>
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
    dispatch(disableReward())
    dispatch(displayRootSelect())
    handleClose()
  }

  const ModalRewardCard = (): JSX.Element => {
    return (
      <CustomMuiCard onClick={() => addRewardCard()} className="modal-reward-card">
        <CustomCardHeader
          disableTypography
          subheader={<Typography variant="body2">{rewardCard.name}</Typography>}
          sx={{ padding: 1 }}
          avatar={<CardCost>{rewardCard.cost}</CardCost>}
        />
        <CardMedia
          component="img"
          height="55"
          image={playerImg}
          alt="カード"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {rewardCard.description}
          </Typography>
        </CardContent>
      </CustomMuiCard>
    )
  }

  const onSkipClick = (): void => {
    dispatch(disableReward())
    dispatch(displayRootSelect())
  }

  return (
    <div style={{ display: reward.disabled ? 'none' : '' }} className='reward'>

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
        <div id='modal-reward'>
          <ModalRewardCard />
        </div>
      </Modal>

    </div>
  )
}

export default Reward
