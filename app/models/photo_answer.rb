class PhotoAnswer < ApplicationRecord
  validates :answer, presence: true, length: { minimum: 50 }, uniqueness: true
  validates :url, presence: true

  belongs_to :user
end
