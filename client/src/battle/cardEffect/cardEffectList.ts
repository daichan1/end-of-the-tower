import { CardEffectProps } from '../../types/battle/cardEffect'
import { cardEffect } from '../../types/battle/cardEffect'
import { strike } from './all/attack'
import { protection } from './all/skill'
import { scorpion, moleclaw, mantis, sword, raygust, thruster } from './attacker/attack'
import { asteroid, meteora, viper, hound, grenade } from './shooter/attack'

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
  },
  {
    name: "asteroid",
    execution: (props: CardEffectProps): void => asteroid(props)
  },
  {
    name: "meteora",
    execution: (props: CardEffectProps): void => meteora(props)
  },
  {
    name: "viper",
    execution: (props: CardEffectProps): void => viper(props)
  },
  {
    name: "hound",
    execution: (props: CardEffectProps): void => hound(props)
  },
  {
    name: "grenade",
    execution: (props: CardEffectProps): void => grenade(props)
  }
]
