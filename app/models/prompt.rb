class Prompt < ApplicationRecord
  validates :description, presence: true, length: { minimum: 10, maximum: 300 }, uniqueness: true

  belongs_to :user
  has_many :answers
end
