import { CardEffectProps } from '../../types/battle/cardEffect'
import { oneAttack, allAttack, oneAttackAndGuard, oneAttackAndBlockAttack } from '../../common/cardEffect'

export const strike = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const scorpion = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const moleclaw = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const mantis = (props: CardEffectProps): void => {
  allAttack(props)
}

export const sword = (props: CardEffectProps): void => {
  oneAttack(props)
}

export const raygust = (props: CardEffectProps): void => {
  oneAttackAndGuard(props)
}

export const thruster = (props: CardEffectProps): void => {
  oneAttackAndBlockAttack(props)
}
