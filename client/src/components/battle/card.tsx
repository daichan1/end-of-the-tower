import { styled } from '@mui/material/styles'
import CardContainer from '@mui/material/Card'
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

const CustomCardHeader = styled(CardHeader)({
  color: "white",
  backgroundColor: "black",
  height: 30
})

const Card = (props: Props) => {
  const { card } = props
  return (
    <CardContainer sx={{ maxWidth: 100, maxHeight: 150 }}>
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
    </CardContainer>
  )
}

export default Card
