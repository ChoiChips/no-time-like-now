require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:handle) {|n| "user#{n}" }
    password 'password'
    password_confirmation 'password'
  end

  factory :prompt do
    sequence(:description) {|n| "This is test prompt #{n}, written by user_1, to be answered with a test response" }
  end
end
