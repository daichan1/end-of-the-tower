import renderer from 'react-test-renderer'
import Line from '../../../components/root_select/line'

describe('Line Component', () => {
  it('display line component', () => {
    const component = renderer.create(
      <Line left={10} top={510} />,
    )
    .toJSON()

    expect(component).toMatchSnapshot()
  })
})
