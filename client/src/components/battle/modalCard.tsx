import Card from './card'
import { CardType } from '../../types/model'

type Props = {
  card: CardType
  clickCard: (card: CardType) => void
}

const ModalCard = (props: Props): JSX.Element => {
  const { card, clickCard } = props
  return (
    <Card
      card={card}
      isModal={true}
      clickCard={clickCard}
    />
  )
}

export default ModalCard
