import { CardEffectProps } from '../../../types/battle/cardEffect'
import { oneAttack, randomOneAttack, allAttack } from '../../../common/cardEffect'

export const asteroid = (props: CardEffectProps): void => {
  randomOneAttack(props)
}

export const meteora = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const viper = (props: CardEffectProps): void => {
  randomOneAttack(props)
}

export const hound = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const grenade = (props: CardEffectProps): void => {
  allAttack(props)
}
