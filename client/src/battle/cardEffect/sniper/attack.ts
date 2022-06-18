import { CardEffectProps } from '../../../types/battle/cardEffect'
import { playerAttack } from '../../../battle/player'
import { setDamage } from '../../../battle/enemy'

export const eagred = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const lightning = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}

export const ibis = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}
