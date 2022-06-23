FactoryBot.define do
  factory :player do
    name { 'all' }
    image_url { 'none' }
    hp { 80 }
    attack { 0 }
    defense { 0 }
    energy { 3 }
  end
end
