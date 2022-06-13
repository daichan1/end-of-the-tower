class EffectType < ActiveRecord::Base
  belongs_to :card

  validates :name, presence: true
  validates :card_id, presence: true
end
