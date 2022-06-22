import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import ShieldIcon from '@mui/icons-material/Shield'
import { useAppSelector } from '../../redux/hooks'
import { hpAdjustment } from '../../common/battle'
import uuid from '../../common/uuid'
import playerImg from '../../images/player.png'

const CustomLinearProgress = styled(LinearProgress)({
  width: 100,
  margin: "auto"
})

const Player = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  const playerDamage = useAppSelector((state) => state.playerDamage)
  return (
    <div>
      <img src={playerImg} alt='プレイヤー' className='player-img' />
      <span className='damage' key={uuid()}>{playerDamage < 0 ? "" : playerDamage}</span>
      <CustomLinearProgress variant="determinate" value={hpAdjustment(player.hp, player.maxHp, 0)}/>
      <Typography variant="subtitle1" component="div" className='hp'>
        {player && player.hp}/{player.maxHp}
      </Typography>
      <div>
        <ShieldIcon />
        <span className='shield'>{player.defense}</span>
      </div>
    </div>
  )
}

export default Player
