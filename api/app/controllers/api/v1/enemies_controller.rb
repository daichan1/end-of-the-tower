class Api::V1::EnemiesController < ApplicationController
  def index
    enemies = Enemy.all
    render json: enemies
  end
end
