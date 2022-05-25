import { useEffect, useState } from 'react'
import axios from 'axios'
import { initializeDeck } from './battle/deck'
import GameTitle from './components/gameTitle'
import RootSelect from './components/rootSelect'
import Battle from './components/battle'
import { PlayerType, EnemyType, CardType } from './types/model'
import { ResPlayer, ResEnemies, ResCards } from './types/api/response'

const App = (): JSX.Element => {
  const [gameTitleDisable, setGameTitleDisable] = useState(false)
  const [rootSelectDisable, setRootSelectDisable] = useState(true)
  const [battleDisable, setBattleDisable] = useState(true)
  const [enemies, setEnemies] = useState<EnemyType[]>([])
  const [player, setPlayer] = useState<PlayerType>({
    name: "",
    imageUrl: "",
    hp: 0,
    attack: 0,
    defense: 0,
    energy: 0
  })
  const [cards, setCards] = useState<CardType[]>([])
  const [deck, setDeck] = useState<CardType[]>([])

  const gameStart = (): void => {
    setGameTitleDisable(true)
    setRootSelectDisable(false)
  }

  const battleStart = (): void => {
    setRootSelectDisable(true)
    setBattleDisable(false)
  }

  const getEnemies = async (): Promise<void> => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/enemies`)
    .then(res => {
      const resEnemies: ResEnemies[] = res.data
      setEnemies(resEnemies.map((enemy: ResEnemies) => {
        return {
          id: enemy.id,
          name: enemy.name,
          imageUrl: enemy.image_url,
          hp: enemy.hp,
          attack: enemy.attack,
          defense: enemy.defense
        }
      }))
    })
    .catch(error => {
      console.log("敵の取得に失敗しました")
    })
  }

  const getPlayer = async (): Promise<void> => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/players`)
    .then(res => {
      const resPlayer: ResPlayer = res.data
      setPlayer({
        name: resPlayer.name,
        imageUrl: resPlayer.image_url,
        hp: resPlayer.hp,
        attack: resPlayer.attack,
        defense: resPlayer.defense,
        energy: resPlayer.energy
      })
    })
    .catch(error => {
      console.log("プレイヤーの取得に失敗しました")
    })
  }

  const getCards = async (): Promise<void> => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/cards`)
    .then(res => {
      let defaultDeck: CardType[] = []
      const resCards: ResCards[] = res.data
      const newCards: CardType[] = resCards.map((card: ResCards) => {
        return {
          name: card.name,
          description: card.description,
          imageUrl: card.image_url,
          cost: card.cost,
          cardType: card.card_type,
          attack: card.attack,
          defense: card.defense
        }
      })
      setCards(newCards)
      defaultDeck = initializeDeck(newCards)
      setDeck(defaultDeck)
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

  return (
    <div>
      <GameTitle
        disable={gameTitleDisable}
        onClick={gameStart}
      />
      <RootSelect
        disable={rootSelectDisable}
        onClick={battleStart}
      />
      <Battle
        disable={battleDisable}
        enemies={enemies}
        player={player}
        deck={deck}
      />
    </div>
  )
}

export default App
