class Card < ActiveRecord::Base
  belongs_to :card

  validates :name, presence: true
end
