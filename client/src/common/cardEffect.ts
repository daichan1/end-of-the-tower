import { PlayerType } from '../types/model'
import { CardEffectProps } from '../types/battle/cardEffect'
import { addBlock } from './battle'
import { playerAttack, randomPlayerAttack, playerBlockAttack } from '../battle/player'
import { setDamage } from '../battle/enemy'

export const oneAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const randomOneAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = randomPlayerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const allAttack = (props: CardEffectProps): void => {
  if (props.type === "allAttack") {
    const { player, enemies, card } = props
    enemies.forEach(enemy => {
      const damage = playerAttack(player, enemy, card)
      setDamage(enemy, damage)
    })
  }
}

export const guard = (props: CardEffectProps): void => {
  if (props.type === "guard") {
    const { player, card } = props
    addBlock(player, card.defense)
  }
}

export const oneAttackAndGuard = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
    addBlock(player, card.defense)
  }
}

export const oneAttackAndBlockAttack = (props: CardEffectProps): void => {
  if (props.type === "oneAttack") {
    const { player, enemy, card } = props
    playerBlockAttack(enemy, card)
    const damage = playerAttack(player, enemy, card)
    setDamage(enemy, damage)
  }
}

export const cardDraw = (player: PlayerType, num: number): void => {
  player.deck.forEach((card, i) => {
    if (i < num) { player.nameplate.push(card) }
  })
  player.deck.splice(0, num)
}
