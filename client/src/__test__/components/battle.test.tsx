import { fireEvent, screen } from "@testing-library/react"
import { render } from '../testProvider'
import { EnemyType } from "../../types/model"
import Battle from '../../components/battle'
import { battleStore, cards } from '../factories/battle'

describe("battle component", () => {
  it("initial render", () => {
    const store = battleStore()
    render(<Battle />, store)

    expect(screen.queryByTestId('modalCard')).toBeNull()
  })

  it("card click", () => {
    const store = battleStore()
    render(<Battle />, store)

    const drawButton = screen.getByText('ドロー')
    fireEvent.click(drawButton)
    const nameplate = screen.getAllByTestId('card')
    fireEvent.click(nameplate[0])

    const newCards = screen.getAllByTestId('card')
    expect(newCards[newCards.length - 1]).toBeInTheDocument()
  })

  it("card action", () => {
    const store = battleStore()
    render(<Battle />, store)

    const drawButton = screen.getByText('ドロー')
    fireEvent.click(drawButton)
    const beforeNameplate = screen.getAllByTestId('card')
    fireEvent.click(beforeNameplate[0])
    const newCards = screen.getAllByTestId('card')
    fireEvent.click(newCards[newCards.length - 1])

    const energy = screen.getByTestId('energy')
    const enemyHp = screen.getByTestId('enemyHp')
    const afterNameplate = screen.getAllByTestId('card')
    const cemetery = screen.getByTestId('cemeteryCount')

    expect(energy.textContent).toBe("2/3")
    expect(enemyHp.textContent).toBe("4/10")
    expect(afterNameplate.length).toBe(4)
    expect(cemetery.textContent).toBe("1")
    expect(screen.queryByTestId('modalCard')).toBeNull()
  })

  it("when one has defeated the enemy", () => {
    const testEnemies: EnemyType[] = [
      {
        id: 1,
        name: "スライム",
        imageUrl: "none",
        hp: 5,
        maxHp: 10,
        attack: 4,
        defense: 0,
        damage: 0,
        floorNumber: 1,
        isBoss: false
      },
      {
        id: 2,
        name: "スライム",
        imageUrl: "none",
        hp: 10,
        maxHp: 10,
        attack: 4,
        defense: 0,
        damage: 0,
        floorNumber: 1,
        isBoss: false
      }
    ]
    const state = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 80,
        maxHp: 80,
        attack: 0,
        defense: 0,
        energy: 3,
        stage: 0,
        deck: cards,
        nameplate: [],
        cemetery: []
      },
      fightEnemies: testEnemies,
      battle: false,
      turn: true,
      choiceEnemy: 0,
      drawButton: false,
      playerActionCount: 0,
      reward: {
        disabled: false,
        displayCards: [],
        cards: cards
      },
      enemyDefeated: false
    }
    const store = battleStore(state)
    render(<Battle />, store)

    const drawButton = screen.getByText('ドロー')
    fireEvent.click(drawButton)
    const nameplate = screen.getAllByTestId('card')
    fireEvent.click(nameplate[0])
    const newCards = screen.getAllByTestId('card')
    fireEvent.click(newCards[newCards.length - 1])

    const enemy = screen.getAllByTestId('enemy')

    expect(enemy.length).toBe(1)
  })

  it("battle victory", () => {
    const testEnemies: EnemyType[] = [
      {
        id: 1,
        name: "スライム",
        imageUrl: "none",
        hp: 5,
        maxHp: 10,
        attack: 4,
        defense: 0,
        damage: 0,
        floorNumber: 1,
        isBoss: false
      }
    ]
    const state = {
      player: {
        name: "アタッカー",
        imageUrl: "none",
        hp: 80,
        maxHp: 80,
        attack: 0,
        defense: 0,
        energy: 3,
        stage: 0,
        deck: cards,
        nameplate: [],
        cemetery: []
      },
      fightEnemies: testEnemies,
      battle: false,
      turn: true,
      choiceEnemy: 0,
      drawButton: false,
      playerActionCount: 0,
      reward: {
        disabled: false,
        displayCards: [],
        cards: cards
      },
      enemyDefeated: false
    }
    const store = battleStore(state)
    render(<Battle />, store)

    const drawButton = screen.getByText('ドロー')
    fireEvent.click(drawButton)
    const nameplate = screen.getAllByTestId('card')
    fireEvent.click(nameplate[0])
    const newCards = screen.getAllByTestId('card')
    fireEvent.click(newCards[newCards.length - 1])

    const battle = screen.getByTestId('battle')

    expect(battle).not.toBeVisible()
  })
})
