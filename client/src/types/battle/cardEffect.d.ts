import { PlayerType, EnemyType, CardType } from '../model/index'

type OneAttack = {
  type: "oneAttack"
  player: PlayerType
  enemy: EnemyType
  card: CardType
  setDamage: (damage: number) => void
}

type AllAttack = {
  type: "allAttack"
  player: PlayerType
  enemies: EnemyType[]
  card: CardType
  setDamage: (damage: number) => void
}

type Guard = {
  type: "guard"
  player: PlayerType
  card: CardType
}

export type CardEffectProps = OneAttack | AllAttack | Guard

export type cardEffect = {
  name: string
  execution: (props: CardEffectProps) => void
}
