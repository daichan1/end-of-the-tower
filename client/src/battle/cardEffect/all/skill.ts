import { CardEffectProps } from '../../../types/battle/cardEffect'
import { guard, cardDraw } from '../../../common/cardEffect'
import { addBlock } from '../../../common/battle'

export const protection = (props: CardEffectProps): void => {
  guard(props)
}

export const escudo = (props: CardEffectProps): void => {
  if (props.type === "guard") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}

export const grasshopper = (props: CardEffectProps): void => {
  if (props.type === "guard") {
    const { player, card } = props
    addBlock(player, card.defense)
    cardDraw(player, 1)
  }
}
