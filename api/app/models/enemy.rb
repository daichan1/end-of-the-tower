class Enemy < ActiveRecord::Base
  validates :name, presence: true
  validates :image_url, presence: true
  validates :hp, presence: true
  validates :attack, presence: true
  validates :defense, presence: true
  validates :floor_number, presence: true
  validates :is_boss, inclusion: { in: [true, false] }
end
