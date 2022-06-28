import renderer from 'react-test-renderer'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { CardType } from '../../types/model'
import GameTitle from '../../components/gameTitle'

jest.mock('../../redux/hooks')
const useAppSelectorMock = useAppSelector as jest.Mock
const useAppDispatchMock = useAppDispatch as jest.Mock

describe("GameTitle Component Snapshot", () => {
  const cards: CardType[] = []
  let gameTitle = false
  beforeEach(() => {
    useAppSelectorMock.mockReturnValueOnce(cards)
    useAppDispatchMock.mockReturnValue(jest.fn())
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("render game title component", () => {
    useAppSelectorMock.mockReturnValueOnce(gameTitle)
    const component = renderer.create(<GameTitle />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("not render game title component", () => {
    gameTitle = true
    useAppSelectorMock.mockReturnValueOnce(gameTitle)
    const component = renderer.create(<GameTitle />).toJSON()

    expect(component).toMatchSnapshot()
  })
})
