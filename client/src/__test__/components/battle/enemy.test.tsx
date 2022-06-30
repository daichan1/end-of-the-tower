import { fireEvent, screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Enemy from '../../../components/battle/enemy'
import { enemyStore, PreloadedState } from '../../factories/battle/enemy'

describe("enemy component", () => {
  it("initial render", () => {
    const store = enemyStore()
    render(<Enemy enemy={store.getState().fightEnemies[0]} index={1} />, store)

    const img = screen.getByRole('img')
    const enemyDamage = screen.getByTestId('enemyDamage')
    const enemyHp = screen.getByTestId('enemyHp')
    const enemyDefense = screen.getByTestId('enemyDefense')

    expect(screen.queryByTestId('choiceEnemy')).toBeNull()
    expect(img).toBeInTheDocument()
    expect(enemyDamage.textContent).toBe("0")
    expect(enemyHp.textContent).toBe("20/20")
    expect(enemyDefense.textContent).toBe("0")
  })

  it("choice enemy after click", () => {
    const state: PreloadedState = {
      fightEnemies: [
        {
          id: 1,
          name: "スライム",
          imageUrl: "none",
          hp: 20,
          maxHp: 20,
          attack: 4,
          defense: 0,
          damage: 5,
          floorNumber: 1,
          isBoss: false
        }
      ],
      choiceEnemy: 1
    }
    const store = enemyStore(state)
    render(<Enemy enemy={store.getState().fightEnemies[0]} index={0} />, store)

    expect(screen.queryByTestId('choiceEnemy')).toBeNull()

    fireEvent.click(screen.getByRole('img'))

    const choiceEnemyIcon = screen.getByTestId('choiceEnemy')
    const enemyDamage = store.getState().fightEnemies[0].defense

    expect(choiceEnemyIcon).toBeInTheDocument()
    expect(enemyDamage).toBe(0)
  })

  it("fight enemies status chenge", () => {
    const state: PreloadedState = {
      fightEnemies: [
        {
          id: 1,
          name: "スライム",
          imageUrl: "none",
          hp: 10,
          maxHp: 20,
          attack: 4,
          defense: 3,
          damage: 5,
          floorNumber: 1,
          isBoss: false
        }
      ],
      choiceEnemy: 0
    }
    const store = enemyStore(state)
    render(<Enemy enemy={store.getState().fightEnemies[0]} index={1} />, store)

    const enemyDamage = screen.getByTestId('enemyDamage')
    const enemyHp = screen.getByTestId('enemyHp')
    const enemyDefense = screen.getByTestId('enemyDefense')

    expect(enemyDamage.textContent).toBe("5")
    expect(enemyHp.textContent).toBe("10/20")
    expect(enemyDefense.textContent).toBe("3")
  })
})
