import { CardEffectProps } from '../../../types/battle/cardEffect'
import { oneAttack } from '../../../common/cardEffect'

export const strike = (props: CardEffectProps): void => {
  oneAttack(props)
}
