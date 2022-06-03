import { useAppSelector } from '../redux/hooks'
import Container from '@mui/material/Container'
import Circle from './root_select/circle'
import Line from './root_select/line'
import { Position } from '../types/root_select/index'
import playerImg from '../images/player.png'
import '../styles/battle/style.scss'

const playerPosition: Position = [
  { left: 2, top: 90 }, // スタート
  { left: 10, top: 90 }, // ステージ1
  { left: 25, top: 90 }, // ステージ2
  { left: 40, top: 90 }, // ステージ3
  { left: 55, top: 90 }, // ステージ4
  { left: 70, top: 90 }, // ステージ5
  { left: 85, top: 90 }  // ステージ6
]

const circlePosition: Position = [
  { left: 10, top: 200 }, // 1列目
  { left: 25, top: 200 }, // 2列目
  { left: 40, top: 200 }, // 3列目
  { left: 55, top: 200 }, // 4列目
  { left: 70, top: 200 }, // 5列目
  { left: 85, top: 200 }  // 6列目
]

const linePosition: Position = [
  { left: 10, top: 200 },  // 1列目
  { left: 25, top: 200 },  // 2列目
  { left: 40, top: 200 },  // 3列目
  { left: 55, top: 200 },  // 4列目
  { left: 70, top: 200 },  // 5列目
]

const Circles = (): JSX.Element => {
  const circles = circlePosition.map((pos, index) =>
    <Circle
      left={pos.left}
      top={pos.top}
      key={index}
      rootNumber={index}
    />
  )
  return <div>{ circles }</div>
}

const Lines = (): JSX.Element => {
  const lines = linePosition.map((pos, index) =>
    <Line left={pos.left} top={pos.top} key={index} />
  )
  return <div>{ lines }</div>
}

const RootSelect = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  const rootSelect = useAppSelector((state) => state.rootSelect)

  return (
    <div style={{ display: rootSelect ? 'none' : '' }}>
      <Container fixed>
        <img
          src={playerImg}
          alt="プレイヤー"
          className='player-img'
          style={{ position: "absolute", left: playerPosition[player.stage].left + '%', top: playerPosition[player.stage].top }}
        />
        <Circles />
        <Lines />
      </Container>
    </div>
  )
}

export default RootSelect
