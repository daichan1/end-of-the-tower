import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
}

const Circle: React.FC<Props> = (props) => {
  return (
    <div
      className='circle'
      style={{ left: props.left + '%', top: props.top }}
    >
    </div>
  )
}

export default Circle;
