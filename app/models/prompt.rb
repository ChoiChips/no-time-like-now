class Prompt < ApplicationRecord
  validates :description, presence: true, length: { minimum: 50, maximum: 500 }, uniqueness: true

  belongs_to :user
end
