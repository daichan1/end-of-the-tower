FactoryBot.define do
  factory :enemy do
    name { 'スライム' }
    image_url { 'none' }
    hp { 20 }
    attack { 4 }
    defense { 0 }
    floor_number { 1 }
    is_boss { false }
  end
end
