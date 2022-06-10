import Avatar from '@mui/material/Avatar'
import { useAppSelector } from '../../redux/hooks'
import '../../styles/battle/style.scss'

const Cemetery = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  return (
    <div className='cemetery'>
      <Avatar className='cemetery-count'>{player.cemetery.length}</Avatar>
    </div>
  )
}

export default Cemetery
