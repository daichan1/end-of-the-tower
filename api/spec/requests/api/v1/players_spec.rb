require 'rails_helper'

RSpec.describe 'PlayersAPI' do
  it 'プレイヤーと固有のカードを取得する' do
    player = create(:attacker)
    effect_type = create(:effect_type)
    FactoryBot.create(:attacker_card, player_id: player.id, effect_type_id: effect_type.id)

    get api_v1_player_path(player.name)
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
    expect(json["player"]["name"]).to eq("アタッカー")
    expect(json["cards"][0]["name"]).to eq("スコーピオン")
  end
end
