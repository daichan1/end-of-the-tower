import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
  onClick: () => void
}

const Circle: React.FC<Props> = (props) => {
  const { left, top, onClick } = props

  return (
    <div
      className='circle'
      style={{ left: left + '%', top: top }}
      onClick={onClick}
    >
    </div>
  )
}

export default Circle
