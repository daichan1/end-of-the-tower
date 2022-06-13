import { CardEffectProps } from '../../types/battle/cardEffect'
import { guard } from '../../common/cardEffect'

export const protection = (props: CardEffectProps): void => {
  guard(props)
}
