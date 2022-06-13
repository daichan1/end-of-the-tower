import { CardEffectProps } from '../types/battle/cardEffect'
import { addBlock } from './battle'
import { playerAttack, playerBlockAttack } from '../battle/player'
import { damaged } from '../battle/enemy'

export const oneAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}

export const allAttack = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card, setDamage } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      damaged(enemy)
      setDamage(damage)
    })
  }
}

export const guard = (props: CardEffectProps): void => {
  if (props.type === "guard") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}

export const oneAttackAndGuard = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
    addBlock(player, card.defense)
  }
}

export const oneAttackAndBlockAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card, setDamage } = props
    playerBlockAttack(enemy, card)
    const damage = playerAttack(player, enemy, card)
    damaged(enemy)
    setDamage(damage)
  }
}
