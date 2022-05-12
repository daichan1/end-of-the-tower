import Container from '@mui/material/Container';
import Circle from './root_select/circle';
import Line from './root_select/line';

type Props = {
  disable: boolean
  onClick: () => void
}

type Click = {
  onClick: () => void
}

type Position = {
  left: number
  top: number
}[]

const circlePosition: Position = [
  { left: 10, top: 200 }, // 1列目
  { left: 25, top: 200 }, // 2列目
  { left: 40, top: 200 }, // 3列目
  { left: 55, top: 200 }, // 4列目
  { left: 70, top: 200 }, // 5列目
  { left: 85, top: 200 }  // 6列目
];

const linePosition: Position = [
  { left: 10, top: 200 },  // 1列目
  { left: 25, top: 200 },  // 2列目
  { left: 40, top: 200 },  // 3列目
  { left: 55, top: 200 },  // 4列目
  { left: 70, top: 200 },  // 5列目
];

const Circles: React.FC<Click> = (props) => {
  const { onClick } = props;

  const circles = circlePosition.map((pos, index) =>
    <Circle
      left={pos.left}
      top={pos.top}
      key={index}
      onClick={onClick}
    />
  );
  return <div>{ circles }</div>
}

const Lines: React.FC = () => {
  const lines = linePosition.map((pos, index) =>
    <Line left={pos.left} top={pos.top} key={index} />
  );
  return <div>{ lines }</div>
}

const RootSelect: React.FC<Props> = (props) => {
  const { disable, onClick } = props;

  return (
    <div style={{ display: disable ? 'none' : '' }}>
      <Container fixed>
        <Circles onClick={onClick} />
        <Lines />
      </Container>
    </div>
  )
}

export default RootSelect;
