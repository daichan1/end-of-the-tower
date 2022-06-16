import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardType } from '../../types/model/index'
import playerImg from '../../images/player.png'
import '../../styles/battle/style.scss'

type Props = {
  width: number
  height: number
  cssClass: string
  card: CardType
  clickCard: (card: CardType) => void
}

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
  const { width, height, cssClass, card, clickCard } = props

  return (
    <MuiCard sx={{ width: width, height: height }} className={cssClass} onClick={() => clickCard(card)}>
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
    </MuiCard>
  )
}

export default Card
