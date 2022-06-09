import { CardEffectProps } from '../types/battle/cardEffect'
import { cardEffect } from '../types/battle/cardEffect'
import { addBlock } from '../common/battle'
import { playerAttack } from '../battle/player'
import { damaged } from './enemy'

export const cardEffectList: cardEffect[] = [
  {
    name: "strike",
    execution: (props: CardEffectProps): number => strike(props)
  },
  {
    name: "protection",
    execution: (props: CardEffectProps): void => protection(props)
  }
]

const strike = (props: CardEffectProps): number => {
  let damage = 0
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    damage = playerAttack(player, enemy, card)
    damaged(enemy)
  }
  return damage
}

const protection = (props: CardEffectProps): void => {
  if (props.type === "guardSkill") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}
