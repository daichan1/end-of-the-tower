import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
  rootNumber: number
  playerStage: number
  onClick: (rootNumber: number, playerStage: number) => void
}

const Circle = (props: Props): JSX.Element => {
  const { left, top, rootNumber, playerStage, onClick } = props

  return (
    <div
      className={`circle ${playerStage === rootNumber ? "next-stage" : ""}`}
      style={{ left: left + '%', top: top }}
      onClick={() => onClick(rootNumber, playerStage)}
    >
    </div>
  )
}

export default Circle
