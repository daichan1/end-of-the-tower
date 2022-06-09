import { styled } from '@mui/material/styles'
import ShieldIcon from '@mui/icons-material/Shield'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { EnemyType } from '../../types/model/index'
import { EnemyDamaged, ChoiceEnemy } from '../../types/battle/index'
import { updateEnemyStatus } from '../../redux/slice/fightEnemiesSlice'
import { resetPlayerDamage } from '../../redux/slice/playerDamageSlice'
import { setChoiceEnemyNumber } from '../../redux/slice/choiceEnemySlice'
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

const Enemies = (props: Props): JSX.Element => {
  const { enemy, index } = props
  const fightEnemies = useAppSelector((state) => state.fightEnemies)
  const enemyDamage = useAppSelector((state) => state.enemyDamage)
  const choiceEnemyNumber = useAppSelector((state) => state.choiceEnemy)
  const dispatch = useAppDispatch()

  const DisplayEnemyDamage = (props: EnemyDamaged): JSX.Element => {
    const { isDamaged } = props
    if (isDamaged) {
      return <span className='damage'>{enemyDamage < 0 ? "" : enemyDamage}</span>
    } else {
      return <span className='damage'></span>
    }
  }

  const DisplayChoiceEnemy = (props: ChoiceEnemy): JSX.Element => {
    const { enemyNumber } = props
    if (choiceEnemyNumber === enemyNumber) {
      return <div><ArrowDownwardIcon /></div>
    } else {
      return <div></div>
    }
  }

  const enemyImageClick = (num: number): void => {
    const enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
    enemiesObj.forEach(enemy => enemy.isDamaged = false)
    dispatch(setChoiceEnemyNumber(num))
    dispatch(resetPlayerDamage())
    dispatch(updateEnemyStatus(enemiesObj))
  }

  return (
    <div>
      <DisplayChoiceEnemy enemyNumber={index} />
      <img src={enemyImg} alt={enemy.name} className='enemy-img' onClick={() => enemyImageClick(index)} />
      <DisplayEnemyDamage isDamaged={enemy.isDamaged} />
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

export default Enemies
