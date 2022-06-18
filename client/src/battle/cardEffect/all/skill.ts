import { CardEffectProps } from '../../../types/battle/cardEffect'
import { cardDraw, addBlock } from '../../../common/cardEffect'

export const protection = (props: CardEffectProps): void => {
  if (props.type === "guard") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
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
