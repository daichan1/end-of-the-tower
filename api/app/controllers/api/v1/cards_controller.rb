class Api::V1::CardsController < ApplicationController
  def index
    player = Player.find(1)
    cards = Card.where(player_id: player.id)
    render json: cards
  end
end
