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

export type ResCard = {
  name: string
  description: string
  image_url: string
  cost: number
  card_type: string
  attack: number
  defense: number
  action_name: string
  execution_count: number
}

export type ResPlayerCards = {
  player: ResPlayer
  cards: ResCard[]
}
