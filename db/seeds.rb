# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Prompt.destroy_all

# Test users
user_1 = User.create!(:handle => 'Nick', :email => 'nick@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
user_2 = User.create!(:handle => 'Bri', :email => 'brianna@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
user_3 = User.create!(:handle => 'Amy', :email => 'amylynn@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')

# Test prompts
prompt_1 = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: user_1)
prompt_2 = Prompt.create!(description: "This is test prompt 2, written by user_1, to be answered with a test response.", user: user_1)
prompt_3 = Prompt.create!(description: "This is test prompt 3, written by user_2, to be answered with a test response.", user: user_2)
