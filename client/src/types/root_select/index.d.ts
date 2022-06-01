export type Click = {
  playerStage: number
  onClick: (rootNumber: number, playerStage: number) => void
}

export type Position = {
  left: number
  top: number
}[]
