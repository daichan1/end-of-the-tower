class Card < ActiveRecord::Base
  belongs_to :player
  belongs_to :effect_type

  validates :name, presence: true
  validates :description, presence: true
  validates :image_url, presence: true
  validates :cost, presence: true
  validates :card_type, presence: true
  validates :attack, presence: true
  validates :defense, presence: true
  validates :action_name, presence: true
  validates :execution_count, presence: true
  validates :player_id, presence: true
  validates :effect_type_id, presence: true
end
