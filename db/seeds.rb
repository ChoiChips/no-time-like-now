# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Prompt.destroy_all
Answer.destroy_all
#
# # Test users
user_1 = User.create!(:handle => 'Nick', :email => 'nick@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
user_2 = User.create!(:handle => 'Bri', :email => 'brianna@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
user_3 = User.create!(:handle => 'Amy', :email => 'amylynn@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')

# Test prompts
prompt_1 = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test answer.", user: user_1)
prompt_2 = Prompt.create!(description: "This is test prompt 2, written by user_1, to be answered with a test answer.", user: user_1)
prompt_3 = Prompt.create!(description: "This is test prompt 3, written by user_2, to be answered with a test answer.", user: user_2)
prompt_4 = Prompt.create!(description: "This is test prompt 4, written by user_2, to be answered with a test answer.", user: user_2)
prompt_5 = Prompt.create!(description: "This is test prompt 5, written by user_3, to be answered with a test answer.", user: user_3)
prompt_6 = Prompt.create!(description: "This is test prompt 6, written by user_3, to be answered with a test answer.", user: user_3)
prompt_7 = Prompt.create!(description: "This is test prompt 7, written by user_1, to be answered with a test answer.", user: user_1)
prompt_8 = Prompt.create!(description: "This is test prompt 8, written by user_2, to be answered with a test answer.", user: user_2)
prompt_9 = Prompt.create!(description: "This is test prompt 9, written by user_3, to be answered with a test answer.", user: user_3)

# Test answers
answer_1 = Answer.create!(answer: "This is test answer 1 for the test prompt 1. It must be a minimum of 50 characters long.", user: user_1, prompt: prompt_1)
answer_2 = Answer.create!(answer: "This is test answer 2 for the test prompt 2. It must be a minimum of 50 characters long.", user: user_2, prompt: prompt_2)
answer_3 = Answer.create!(answer: "This is test answer 3 for the test prompt 3. It must be a minimum of 50 characters long.", user: user_3, prompt: prompt_3)
answer_4 = Answer.create!(answer: "This is test answer 4 for the test prompt 1. It must be a minimum of 50 characters long.", user: user_1, prompt: prompt_1)
answer_5 = Answer.create!(answer: "This is test answer 5 for the test prompt 2. It must be a minimum of 50 characters long.", user: user_2, prompt: prompt_2)
answer_6 = Answer.create!(answer: "This is test answer 6 for the test prompt 3. It must be a minimum of 50 characters long.", user: user_3, prompt: prompt_3)
answer_7 = Answer.create!(answer: "This is test answer 7 for the test prompt 1. It must be a minimum of 50 characters long.", user: user_1, prompt: prompt_1)
answer_8 = Answer.create!(answer: "This is test answer 8 for the test prompt 2. It must be a minimum of 50 characters long.", user: user_2, prompt: prompt_2)
answer_9 = Answer.create!(answer: "This is test answer 9 for the test prompt 3. It must be a minimum of 50 characters long.", user: user_3, prompt: prompt_3)
