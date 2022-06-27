import renderer from 'react-test-renderer'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { PlayerType } from '../../../types/model'
import { EnemyList } from '../../../types/data/enemy'
import Circle from '../../../components/root_select/circle'

jest.mock('../../../redux/hooks')
const useAppSelectorMock = useAppSelector as jest.Mock
const useAppDispatchMock = useAppDispatch as jest.Mock

describe('Circle Component', () => {
  const player: PlayerType = {
    name: "アタッカー",
    imageUrl: "none",
    hp: 80,
    maxHp: 80,
    attack: 0,
    defense: 0,
    energy: 3,
    stage: 0,
    deck: [],
    nameplate: [],
    cemetery: []
  }
  const enemyList: EnemyList = {
    stage1: [],
    stage2: [],
    stage3: [],
    stage4: [],
    stage5: [],
    stage6: []
  }
  beforeEach(() => {
    useAppSelectorMock.mockReturnValueOnce(player)
    useAppSelectorMock.mockReturnValueOnce(enemyList)
    useAppDispatchMock.mockReturnValue(jest.fn())
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("display not choice circle", () => {
    const component = renderer.create(
      <Circle left={10} top={510} rootNumber={1} />
    )
    .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("display choice circle", () => {
    const component = renderer.create(
      <Circle left={10} top={510} rootNumber={0} />
    )
    .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("display clear circle", () => {
    player.stage = 1
    const component = renderer.create(
      <Circle left={10} top={510} rootNumber={0} />
    )
    .toJSON()

    expect(component).toMatchSnapshot()
  })
})
