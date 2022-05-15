class Player < ActiveRecord::Base
  has_many :cards, dependent: :destroy

  validates :name, presence: true
  validates :image_url, presence: true
  validates :hp, presence: true
  validates :attack, presence: true
  validates :defense, presence: true
  validates :energy, presence: true
end
