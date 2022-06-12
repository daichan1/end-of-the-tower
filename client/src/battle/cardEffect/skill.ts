import { CardEffectProps } from '../../types/battle/cardEffect'
import { guardSkill } from '../../common/cardEffect'

export const protection = (props: CardEffectProps): void => {
  guardSkill(props)
}
