class Api::V1::TestsController < ApplicationController
  def index
    render json: "テストです"
  end
end
