export type cardEffect = {
  name: string
  execution: (player: PlayerType, enemies: EnemyType[], card: CardType) => void
}
