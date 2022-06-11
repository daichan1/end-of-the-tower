class Api::V1::PlayersController < ApplicationController
  def index
    player = Player.find(2)
    render json: player
  end

  def show
    player = Player.find(params[:id])
    cards = Card.where(player_id: player.id)
    result = {
      player: player,
      cards: cards
    }
    render json: result
  end
end
