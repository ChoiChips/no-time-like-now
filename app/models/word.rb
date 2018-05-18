class Word < ApplicationRecord
  validates :word, presence: true
  validates :definition, presence: true

  has_many :answers
end
