import { CardEffectProps } from '../../../types/battle/cardEffect'
import { oneAttack, allAttack } from '../../../common/cardEffect'

export const eagred = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const lightning = (props: CardEffectProps): void => {
  allAttack(props)
}

export const ibis = (props: CardEffectProps): void => {
  allAttack(props)
}
