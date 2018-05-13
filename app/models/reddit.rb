class Reddit < ApplicationRecord
  validates :description, presence: true, uniqueness: true
  validates :handle, presence: true
  validates :date_made, presence: true
end
