import { styled } from '@mui/material/styles'
import ShieldIcon from '@mui/icons-material/Shield'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { EnemyType } from '../../types/model/index'
import { ChoiceEnemy } from '../../types/battle/index'
import { resetDamage } from '../../redux/slice/fightEnemiesSlice'
import { resetPlayerDamage } from '../../redux/slice/playerDamageSlice'
import { setChoiceEnemyNumber } from '../../redux/slice/choiceEnemySlice'
import uuid from '../../common/uuid'
import { hpAdjustment } from '../../common/battle'
import enemyImg from '../../images/enemy.png'

type Props = {
  enemy: EnemyType
  index: number
}

const CustomLinearProgress = styled(LinearProgress)({
  width: 100,
  margin: "auto"
})

const Enemy = (props: Props): JSX.Element => {
  const { enemy, index } = props
  const choiceEnemyNumber = useAppSelector((state) => state.choiceEnemy)
  const dispatch = useAppDispatch()

  const DisplayChoiceEnemy = (props: ChoiceEnemy): JSX.Element => {
    const { enemyNumber } = props
    if (choiceEnemyNumber === enemyNumber) {
      return <div><ArrowDownwardIcon /></div>
    } else {
      return <div></div>
    }
  }

  const enemyImageClick = (num: number): void => {
    dispatch(setChoiceEnemyNumber(num))
    dispatch(resetDamage())
    dispatch(resetPlayerDamage())
  }

  return (
    <div>
      <DisplayChoiceEnemy enemyNumber={index} />
      <img src={enemyImg} alt={enemy.name} className='enemy-img' onClick={() => enemyImageClick(index)} />
      <span className='damage' key={uuid()}>{enemy.damage < 0 ? "" : enemy.damage}</span>
      <CustomLinearProgress variant="determinate" value={hpAdjustment(enemy.hp, enemy.maxHp, 0)}/>
      <Typography variant="subtitle1" component="div">
        {enemy.hp}/{enemy.maxHp}
      </Typography>
      <div>
        <ShieldIcon />
        <span>{enemy.defense}</span>
      </div>
    </div>
  )
}

export default Enemy
