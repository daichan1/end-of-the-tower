import { CardEffectProps } from '../types/battle/cardEffect'
import { cardEffect } from '../types/battle/cardEffect'
import { addBlock } from '../common/battle'
import { playerAttack } from '../battle/player'
import { damaged } from './enemy'

export const cardEffectList: cardEffect[] = [
  {
    name: "strike",
    execution: (props: CardEffectProps): void => strike(props)
  }
]

const strike = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}

// const protection = (player: PlayerType, card: CardType): void => {
//   addBlock(player, card.defense)
// }
