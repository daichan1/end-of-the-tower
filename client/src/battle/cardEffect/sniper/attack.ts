import { CardEffectProps } from '../../../types/battle/cardEffect'
import { attack } from '../../../common/cardEffect'
import { setDamage } from '../../../battle/enemy'

export const eagred = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = attack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const lightning = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = attack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}

export const ibis = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = attack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}
