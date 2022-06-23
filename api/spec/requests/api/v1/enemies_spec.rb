require 'rails_helper'

RSpec.describe 'EnemiesAPI' do
  it '全ての敵を取得する' do
    FactoryBot.create(:enemy)

    get '/api/v1/enemies'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
  end
end
