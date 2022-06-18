import { CardEffectProps } from '../../../types/battle/cardEffect'
import { playerAttack, randomPlayerAttack } from '../../../battle/player'
import { setDamage } from '../../../battle/enemy'

export const asteroid = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = randomPlayerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const meteora = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const viper = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = randomPlayerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const hound = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const grenade = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}
