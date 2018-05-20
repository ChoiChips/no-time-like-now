class WordAnswer < ApplicationRecord
  validates :answer, presence: true, length: { minimum: 50 }, uniqueness: true

  belongs_to :user
  has_many :word_combos
  has_many :words, through: :word_combos
end
