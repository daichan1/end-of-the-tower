import Avatar from '@mui/material/Avatar'
import { useAppSelector } from '../../redux/hooks'
import '../../styles/battle/style.scss'

const Deck = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  return (
    <div className='deck'>
      <Avatar className='deck-count' data-testid='deckCount'>{player.deck.length}</Avatar>
    </div>
  )
}

export default Deck
