import Card from './card'
import { CardType } from '../../types/model'

type Props = {
  card: CardType
  width: number
  height: number
  clickCard: (card: CardType) => void
}

const ModalCard = (props: Props): JSX.Element => {
  const { card, width, height, clickCard } = props
  return (
    <Card
      card={card}
      width={width}
      height={height}
      clickCard={clickCard}
    />
  )
}

export default ModalCard
