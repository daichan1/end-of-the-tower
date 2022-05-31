import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
  rootNumber: number
  onClick: (rootNumber: number) => void
}

const Circle = (props: Props): JSX.Element => {
  const { left, top, rootNumber, onClick } = props

  return (
    <div
      className='circle'
      style={{ left: left + '%', top: top }}
      onClick={() => onClick(rootNumber)}
    >
    </div>
  )
}

export default Circle
