class RedditAnswer < ApplicationRecord
  validates :answer, presence: true, length: { minimum: 50 }, uniqueness: true

  belongs_to :user
  belongs_to :reddit
end
