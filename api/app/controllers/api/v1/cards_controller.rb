class Api::V1::CardsController < ApplicationController
  def index
    player = Player.find_by(name: "all")
    cards = Card.where(player_id: player.id)
    effect_types = EffectType.all
    card_result = cards.map { |card|
      {
        id: card.id,
        name: card.name,
        description: card.description,
        image_url: card.image_url,
        cost: card.cost,
        card_type: card.card_type,
        attack: card.attack,
        defense: card.defense,
        action_name: card.action_name,
        execution_count: card.execution_count,
        effect_type: effect_types.find(card.effect_type_id).name,
        player_id: card.player_id,
        created_at: card.created_at,
        updated_at: card.updated_at
      }
    }
    render json: card_result
  end
end
