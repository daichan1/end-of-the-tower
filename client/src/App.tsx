import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { EnemyType, CardBaseType } from './types/model/index'
import { ResPlayer, ResEnemies, ResCards } from './types/api/response'
import { EnemyList } from './types/data/enemy'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { setPlayer, initialDeck, incrementStage } from './redux/slice/playerSlice'
import GameTitle from './components/gameTitle'
import RootSelect from './components/rootSelect'
import Battle from './components/battle'
import { initializeDeck } from './battle/deck'
import { createEnemyList } from './data/enemyList'

const App = (): JSX.Element => {
  const [gameTitleDisable, setGameTitleDisable] = useState(false)
  const [rootSelectDisable, setRootSelectDisable] = useState(true)
  const [battleDisable, setBattleDisable] = useState(true)
  const [enemies, setEnemies] = useState<EnemyType[]>([])
  const [fightEnemies, setFightEnemies] = useState<EnemyType[]>([])
  const [cards, setCards] = useState<CardBaseType[]>([])

  const player = useAppSelector((state) => state.player)
  const dispatch = useAppDispatch()

  const gameStart = (): void => {
    setGameTitleDisable(true)
    setRootSelectDisable(false)
  }

  const battleStart = (rootNumber: number, playerStage: number): void => {
    // 次のステージを選択した時のみバトルを開始する
    if (playerStage === rootNumber) {
      decisionFightEnemies(rootNumber)
      setRootSelectDisable(true)
      setBattleDisable(false)
    }
  }

  const decisionFightEnemies = (rootNumber: number): void => {
    const parseEnemies = JSON.parse(JSON.stringify(enemies))
    const enemyList: EnemyList = createEnemyList(parseEnemies)
    switch (rootNumber) {
      case 0:
        setFightEnemies(enemyList.slime)
        break
      case 1:
        setFightEnemies(enemyList.gargoyle)
        break
      case 2:
        setFightEnemies(enemyList.slimeAndGargoyle)
        break
      case 3:
        setFightEnemies(enemyList.slimeAndGargoyle)
        break
      case 4:
        setFightEnemies(enemyList.slimeAndGargoyle)
        break
      case 5:
        setFightEnemies(enemyList.slimeAndGargoyle)
        break
    }
  }

  const victory = (): void => {
    dispatch(incrementStage())
    setBattleDisable(true)
    setRootSelectDisable(false)
  }

  const lose = (): void => {
    setBattleDisable(true)
    setGameTitleDisable(false)
  }

  const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_URL_BROWSER })
  axiosRetry(axiosClient, { retries: 3 })

  const getEnemies = async (): Promise<void> => {
    await axiosClient.get('/v1/enemies')
    .then(res => {
      const resEnemies: ResEnemies[] = res.data
      const newEnemies: EnemyType[] = resEnemies.map((enemy: ResEnemies) => {
        return {
          id: enemy.id,
          name: enemy.name,
          imageUrl: enemy.image_url,
          hp: enemy.hp,
          maxHp: enemy.hp,
          attack: enemy.attack,
          defense: enemy.defense
        }
      })
      setEnemies(newEnemies)
    })
    .catch(error => {
      console.log("敵の取得に失敗しました")
    })
  }

  const getPlayer = async (): Promise<void> => {
    await axiosClient.get('/v1/players')
    .then(res => {
      const resPlayer: ResPlayer = res.data
      dispatch(setPlayer(resPlayer))
    })
    .catch(error => {
      console.log("プレイヤーの取得に失敗しました")
    })
  }

  const getCards = async (): Promise<void> => {
    await axiosClient.get('/v1/cards')
    .then(res => {
      const resCards: ResCards[] = res.data
      const newCards: CardBaseType[] = resCards.map((card: ResCards) => {
        return {
          name: card.name,
          description: card.description,
          imageUrl: card.image_url,
          cost: card.cost,
          cardType: card.card_type,
          attack: card.attack,
          defense: card.defense,
          actionName: card.action_name
        }
      })
      setCards(newCards)
    })
    .catch(error => {
      console.log("カードの取得に失敗しました")
    })
  }

  useEffect((): void => {
    getEnemies()
    getPlayer()
    getCards()
  }, [])

  useEffect((): void => {
    const defaultDeck = initializeDeck(cards)
    dispatch(initialDeck(defaultDeck))
  }, [cards])

  return (
    <div>
      <GameTitle
        disable={gameTitleDisable}
        onClick={gameStart}
      />
      <RootSelect
        disable={rootSelectDisable}
        playerStage={player.stage}
        onClick={battleStart}
      />
      <Battle
        disable={battleDisable}
        enemies={fightEnemies}
        victory={victory}
        lose={lose}
      />
    </div>
  )
}

export default App
