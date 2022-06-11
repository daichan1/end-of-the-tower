class Api::V1::PlayersController < ApplicationController
  def index
    player = Player.find(2)
    render json: player
  end

  def show
    player = Player.find(params[:id])
    render json: player
  end
end
