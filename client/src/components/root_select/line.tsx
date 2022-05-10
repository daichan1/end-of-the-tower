import '../../styles/root_select/style.scss'

type Props = {
  left: number
  top: number
}

const Line: React.FC<Props> = (props) => {
  const circleHeight: number = 20;
  const circleWidth: number = 20;

  return (
    <div
      className='line'
      style={{
        left: `calc(${props.left}% + ${circleWidth}px)`,
        top: props.top + (circleHeight / 2),
        width: `calc(15% - ${circleWidth}px)`
      }}
    >

    </div>
  )
}

export default Line;
