import { ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardType } from '../../types/model/index'
import playerImg from '../../images/player.png'

type Props = {
  card: CardType
  isModal: boolean
  clickCard: (card: CardType) => void
}

const NameplateMuiCard = styled(MuiCard)({
  width: 125,
  height: 175,
  marginRight: 5,
  "&:hover": {
    position: "relative",
    top: -8,
    left: -8,
    zIndex: 1
  }
})

const ModalMuiCard = styled(MuiCard)({
  width: 150,
  height: 200,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
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

const Card = (props: Props): JSX.Element => {
  const { card, isModal, clickCard } = props

  const CustomMuiCard = (props: { children: ReactNode }): JSX.Element => {
    if (isModal) {
      return (
        <ModalMuiCard onClick={() => clickCard(card)}>
          {props.children}
        </ModalMuiCard>
      )
    } else {
      return (
        <NameplateMuiCard onClick={() => clickCard(card)}>
          {props.children}
        </NameplateMuiCard>
      )
    }
  }

  return (
    <CustomMuiCard>
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
  )
}

export default Card
