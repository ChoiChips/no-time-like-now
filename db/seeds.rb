# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'nokogiri'
require 'open-uri'

# User.destroy_all
# Prompt.destroy_all
# Answer.destroy_all
#
# # Test users
# user_1 = User.create!(:handle => 'Nick', :email => 'nick@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
# user_2 = User.create!(:handle => 'Amy', :email => 'amylynn@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
# user_3 = User.create!(:handle => 'Bri', :email => 'brianna@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
# user_4 = User.create!(:handle => 'John', :email => 'john@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
# user_5 = User.create!(:handle => 'Sam', :email => 'sam@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
# user_6 = User.create!(:handle => 'Jane', :email => 'jane@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret')
#
# # Test prompts
# prompt_1 = Prompt.create!(description: "If you had to make a Breakable Toy, what would you make?", user: user_1)
# prompt_2 = Prompt.create!(description: "How would you design a program to automatically apply to new jobs as they come up?", user: user_4)
# prompt_3 = Prompt.create!(description: "In the afterlife, the saying, \"kick the bucket\" is taken seriously. The further you kick your bucket, the more benefits you get in the next life. However, you did what no one else has done before: kick the bucket backwards.", user: user_2)
# prompt_4 = Prompt.create!(description: "An assassin has been hired to kill you. He's cold, mechanical, and efficient. He is the Refrigerator.", user: user_5)
# prompt_5 = Prompt.create!(description: "As a paranormal investigator, nobody expects your secret: some of your best friends and advisors are ghosts.", user: user_6)
# prompt_6 = Prompt.create!(description: "Superstitions are real and everyone knows it. Thirteenth floor is off limits and you DO NOT walk under a ladder. Today you get a emergency alert on your phone two hundred black cats have been dropped in the city you live. This is equivalent to a small scale nuclear exchange.", user: user_3)
# prompt_7 = Prompt.create!(description: "You are part of a secret organization experimenting on captured murderers and serial killers. One of your experiments involves giving one of the most brutal serial killers of your era a conscience.", user: user_4)
# prompt_8 = Prompt.create!(description: "The Fellowship of the Ring has been formed to lead Frodo to Mordor - it is comprised of the famous wizard Gilderay Lockhart, Buddy the elf, sneezy dwarf, and Monty Python's King Arthur and the Black Knight...", user: user_5)
# prompt_9 = Prompt.create!(description: "Science created a machine that can observe the past, they discover ancient civilizations were far more advanced than we imagined and could see the future before being wiped out. They watched only one thing, your life.", user: user_6)
#
# # Test answers
# answer_1 = Answer.create!(answer: "A website to track all my favorite movie speeches. My favorite speech is by Aragorn the Lord Of The Rings: Sons of Gondor! Of Rohan! My brothers! I see in your eyes the same fear that would take the heart of me! A day may come when the courage of men fails, when we forsake our friends and break all bonds of fellowship. But it is not this day. An hour of wolves and shattered shields when the age of Men comes crashing down! But it is not this day! This day we fight! By all that you hold dear on this good Earth, I bid you stand! Men of the West!", user: user_1, prompt: prompt_1)
# answer_2 = Answer.create!(answer: "I would use something with Ruby and Javascript and Python. Probably something with Unicorns as well.", user: user_1, prompt: prompt_2)
# answer_3 = Answer.create!(answer: "I would definitely start by utilizing Google and Stack overflow. From there, I would probably try searching for other resources.", user: user_1, prompt: prompt_3)
# answer_4 = Answer.create!(answer: "I think I would make a website for me to compile all my writing in one place. Somewhere that I can be exposed to a hub of prompts to respond to and get the creative juices flowing! ", user: user_2, prompt: prompt_1)
# answer_5 = Answer.create!(answer: "Probably follow something similar to what other job sites do. See if there is an API that collects said jobs for me.", user: user_2, prompt: prompt_2)
# answer_7 = Answer.create!(answer: "I would make a Breakable Toy that makes other Breakable Toys and name it \"The Unbreakable Toy\"", user: user_3, prompt: prompt_1)
# answer_8 = Answer.create!(answer: "I definitely would start by utilizing Google and Stack overflow. From there, I would probably try searching for other resources.", user: user_1, prompt: prompt_3)
# answer_9 = Answer.create!(answer: "I would make a website for me to compile all my writing in one place. Somewhere that I can be exposed to a hub of prompts to respond to and get the creative juices flowing! ", user: user_2, prompt: prompt_1)
# answer_10 = Answer.create!(answer: "Possibly follow something similar to what other job sites do. See if there is an API that collects said jobs for me.", user: user_2, prompt: prompt_2)
# answer_11 = Answer.create!(answer: "Make a Breakable Toy that makes other Breakable Toys and name it \"The Unbreakable Toy\"", user: user_3, prompt: prompt_1)


if Word.first.nil?
  WEIRD_WORDS_URL = 'https://en.oxforddictionaries.com/explore/weird-and-wonderful-words/'
  page = Nokogiri::HTML(open(WEIRD_WORDS_URL))
  words = page.css(".textBlock table tr")

  words.each do |word|
    Word.create!(word: word.css("strong").text, definition: word.css("td")[1].text)
  end
end
