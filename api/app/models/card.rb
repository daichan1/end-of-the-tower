class Card < ActiveRecord::Base
  belongs_to :player

  validates :name, presence: true
  validates :description, presence: true
  validates :image_url, presence: true
  validates :cost, presence: true
  validates :type, presence: true
  validates :attack, presence: true
  validates :defense, presence: true
  validates :player_id, presence: true
end
