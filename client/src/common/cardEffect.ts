import { CardEffectProps } from '../types/battle/cardEffect'
import { addBlock } from './battle'
import { playerAttack } from '../battle/player'
import { damaged } from '../battle/enemy'

export const oneAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}

export const guardSkill = (props: CardEffectProps): void => {
  if (props.type === "guardSkill") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}
