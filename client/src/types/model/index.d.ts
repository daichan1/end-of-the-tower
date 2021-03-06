export type EnemyType = {
  id: number
  name: string
  imageUrl: string
  hp: number
  maxHp: number
  attack: number
  defense: number
  damage: number
  floorNumber: number
  isBoss: boolean
}

export type PlayerType = {
  name: string
  imageUrl: string
  hp: number
  maxHp: number
  attack: number
  defense: number
  energy: number
  stage: number
  deck: CardType[]
  nameplate: CardType[]
  cemetery: CardType[]
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
  executionCount: number
  effectType: string
}
