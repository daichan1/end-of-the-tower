class Api::V1::PlayersController < ApplicationController
  def index
    player = Player.find(2)
    render json: player
  end

  def show
    player = Player.find(params[:id])
    cards = Card.where(player_id: player.id)
    effect_types = EffectType.all
    card_result = cards.map { |card|
      {
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
    result = {
      player: player,
      cards: card_result
    }
    render json: result
  end
end
