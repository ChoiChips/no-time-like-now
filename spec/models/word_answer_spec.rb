require 'rails_helper'

describe WordAnswer do
  test_user = User.create!(handle: "word_answer_user", email: "word_answer@gmail.com", password: "password", password_confirmation: "password")
  test_word_answer = WordAnswer.new(answer: "This is a test word answer for 3 test words. It must be minimum 50 characters long", user: test_user)

  it "is valid with valid attributes" do
    expect(test_word_answer).to be_valid
  end

  it "is not valid without answer" do
    test_word_answer.answer = nil
    expect(test_word_answer.save).to eq(false)
    expect(test_word_answer.errors[:answer]).to_not be_nil
  end

  it "should belong to user" do
    t = WordAnswer.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have many word combos" do
    t = WordAnswer.reflect_on_association(:word_combos)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many words" do
    t = WordAnswer.reflect_on_association(:words)
    expect(t.macro).to eq(:has_many)
  end
end
