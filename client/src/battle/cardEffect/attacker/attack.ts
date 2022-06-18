import { CardEffectProps } from '../../../types/battle/cardEffect'
import { addBlock } from '../../../common/cardEffect'
import { playerAttack, playerBlockAttack } from '../../../battle/player'
import { setDamage } from '../../../battle/enemy'

export const scorpion = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const moleclaw = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const mantis = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}

export const sword = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const raygust = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
    addBlock(player, card.defense)
  }
}

export const thruster = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    playerBlockAttack(enemy, card)
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}
