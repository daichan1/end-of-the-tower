require 'rails_helper'

RSpec.describe 'CardsAPI' do
  it 'allプレイヤーのカードを取得する' do
    player = FactoryBot.create(:player)
    effect_type = FactoryBot.create(:effect_type)
    FactoryBot.create(:card, player_id: player.id, effect_type_id: effect_type.id)

    get '/api/v1/cards'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
    expect(json[0]['name']).to eq('ストライク')
  end
end
