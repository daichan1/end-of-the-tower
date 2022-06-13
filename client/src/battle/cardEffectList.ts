import { CardEffectProps } from '../types/battle/cardEffect'
import { cardEffect } from '../types/battle/cardEffect'
import { strike, scorpion, moleclaw, mantis, sword, raygust, thruster } from './cardEffect/attack'
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
  },
  {
    name: "mantis",
    execution: (props: CardEffectProps): void => mantis(props)
  },
  {
    name: "sword",
    execution: (props: CardEffectProps): void => sword(props)
  },
  {
    name: "raygust",
    execution: (props: CardEffectProps): void => raygust(props)
  },
  {
    name: "thruster",
    execution: (props: CardEffectProps): void => thruster(props)
  }
]
