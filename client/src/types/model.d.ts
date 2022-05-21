export type EnemyType = {
  id: number
  name: string
  imageUrl: string
  hp: number
  attack: number
  defense: number
}

export type PlayerType = {
  name: string
  imageUrl: string
  hp: number
  attack: number
  defense: number
  energy: number
}

export type CardType = {
  name: string
  description: string
  imageUrl: string
  cost: number
  cardType: string
  attack: number
  defense: number
}
