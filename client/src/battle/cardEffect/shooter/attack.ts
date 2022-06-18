import { CardEffectProps } from '../../../types/battle/cardEffect'
import { attack, randomAttack } from '../../../common/cardEffect'
import { setDamage } from '../../../battle/enemy'

export const asteroid = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = randomAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const meteora = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = attack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const viper = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = randomAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const hound = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = attack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const grenade = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = attack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}
