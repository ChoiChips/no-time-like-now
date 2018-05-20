class Word < ApplicationRecord
  validates :word, presence: true
  validates :definition, presence: true

  has_many :word_combos
  has_many :word_answers, through: :word_combos
end
