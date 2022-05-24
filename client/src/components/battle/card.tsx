import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import playerImg from '../../images/player.png'

type Props = {
  card: {
    name: string
    description: string
    imageUrl: string
    cost: number
    cardType: string
    attack: number
    defense: number
  }
}

const CustomMuiCard = styled(MuiCard)({
  marginRight: 5
})

const CustomCardHeader = styled(CardHeader)({
  color: "white",
  backgroundColor: "black",
  height: 30
})

const Card = (props: Props): JSX.Element => {
  const { card } = props
  return (
    <CustomMuiCard
      sx={{ maxWidth: 100, maxHeight: 150 }}
      className='card'
    >
      <CustomCardHeader
        disableTypography
        subheader={<Typography variant="body2">{card.name}</Typography>}
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
