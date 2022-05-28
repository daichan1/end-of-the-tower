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
  deck: CardType[]
  nameplate: CardType[]
  cemetery: CardType[]
}

export type CardBaseType = {
  name: string
  description: string
  imageUrl: string
  cost: number
  cardType: string
  attack: number
  defense: number
  actionName: string
}

export type CardType = {
  id: number
  name: string
  description: string
  imageUrl: string
  cost: number
  cardType: string
  attack: number
  defense: number
  actionName: string
}
