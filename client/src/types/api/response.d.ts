export type ResPlayer = {
  name: string
  image_url: string
  hp: number
  attack: number
  defense: number
  energy: number
}


export type ResEnemies = {
  id: number
  name: string
  image_url: string
  hp: number
  attack: number
  defense: number
}

export type ResCards = {
  name: string
  description: string
  image_url: string
  cost: number
  card_type: string
  attack: number
  defense: number
}
