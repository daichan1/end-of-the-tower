import { CardEffectProps } from '../types/battle/cardEffect'
import { cardEffect } from '../types/battle/cardEffect'
import { addBlock } from '../common/battle'
import { playerAttack } from '../battle/player'
import { damaged } from './enemy'

export const cardEffectList: cardEffect[] = [
  {
    name: "strike",
    execution: (props: CardEffectProps): void => strike(props)
  },
  {
    name: "protection",
    execution: (props: CardEffectProps): void => protection(props)
  },
  {
    name: "scorpion",
    execution: (props: CardEffectProps): void => scorpion(props)
  },
  {
    name: "moleclaw",
    execution: (props: CardEffectProps): void => moleclaw(props)
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

const protection = (props: CardEffectProps): void => {
  if (props.type === "guardSkill") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}

const scorpion = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}

const moleclaw = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}
