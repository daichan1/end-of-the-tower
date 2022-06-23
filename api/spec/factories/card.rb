FactoryBot.define do
  factory :card do
    name { 'ストライク' }
    description { '6ダメージを与える' }
    image_url { 'none' }
    cost { 1 }
    card_type { 'アタック' }
    attack { 6 }
    defense { 0 }
    action_name { 'strike' }
    execution_count { 1 }
  end
end
