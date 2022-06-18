import { CardEffectProps } from '../../../types/battle/cardEffect'
import { attack } from '../../../common/cardEffect'
import { setDamage } from '../../../battle/enemy'

export const strike = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = attack(player, enemy, card)
    setDamage(enemy, damage)
  }
}
