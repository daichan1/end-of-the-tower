import { CardEffectProps } from '../../../types/battle/cardEffect'
import { playerAttack } from '../../../battle/player'
import { setDamage } from '../../../battle/enemy'

export const strike = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}
