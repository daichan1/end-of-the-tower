import { CardEffectProps } from '../types/battle/cardEffect'
import { cardEffect } from '../types/battle/cardEffect'
import { strike, scorpion, moleclaw } from './cardEffect/attack'
import { protection } from './cardEffect/skill'

export const cardEffectList: cardEffect[] = [
  {
    name: "strike",
    execution: (props: CardEffectProps): void => strike(props)
  },
  {
    name: "protection",
    execution: (props: CardEffectProps): void => protection(props)
  },
  {
    name: "scorpion",
    execution: (props: CardEffectProps): void => scorpion(props)
  },
  {
    name: "moleclaw",
    execution: (props: CardEffectProps): void => moleclaw(props)
  }
]
