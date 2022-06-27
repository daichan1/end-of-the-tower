import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { fireEvent, screen } from '@testing-library/react'
import { render } from '../../testProvider'
import { PlayerType } from '../../../types/model/index'
import { EnemyList } from '../../../types/data/enemy'
import Circle from '../../../components/root_select/circle'
import playerReducer from '../../../redux/slice/playerSlice'
import enemyListReducer from '../../../redux/slice/enemyListSlice'
import battleReducer from '../../../redux/slice/battleSlice'
import rootSelectReducer from '../../../redux/slice/rootSelectSlice'

type PreloadedState = {
  player: PlayerType
  enemyList: EnemyList
  rootSelect: boolean
  battle: boolean
}

// テストデータ
const preloadedState: PreloadedState = {
  player: {
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
  },
  enemyList: {
    stage1: [],
    stage2: [],
    stage3: [],
    stage4: [],
    stage5: [],
    stage6: []
  },
  rootSelect: false,
  battle: true
}

// circle componentのテスト用のstore
const circleComponentStore = (preloadedState: PreloadedState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        enemyList: enemyListReducer,
        battle: battleReducer,
        rootSelect: rootSelectReducer
      },
      preloadedState
    }
  )
}

describe('Circle Component', () => {
  it('render circle button', () => {
    const store = circleComponentStore(preloadedState)
    render(<Circle left={10} top={510} rootNumber={0} />, store)

    const circle = screen.getByRole('button')
    expect(circle).toBeInTheDocument()
  })

  it("display battle component after click", () => {
    const store = circleComponentStore(preloadedState)
    render(<Circle left={10} top={510} rootNumber={0} />, store)

    expect(store.getState().battle).toEqual(true)

    const circle = screen.getByRole('button')
    fireEvent.click(circle)
    expect(store.getState().battle).toEqual(false)
  })

  it("disabled battle component after click", () => {
    const store = circleComponentStore(preloadedState)
    render(<Circle left={10} top={510} rootNumber={1} />, store)

    expect(store.getState().battle).toEqual(true)

    const circle = screen.getByRole('button')
    fireEvent.click(circle)
    expect(store.getState().battle).toEqual(true)
  })
})
