require 'rails_helper'

describe RedditAnswer do
  test_user = User.create!(handle: "reddit_user", email: "reddit_answer@gmail.com", password: "password", password_confirmation: "password")
  test_reddit = Reddit.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")
  test_reddit_answer = RedditAnswer.new(answer: "This is a test answer for test prompt 1. It must be a certain minimum length", user: test_user, reddit: test_reddit)

  it "is valid with valid attributes" do
    expect(test_reddit_answer).to be_valid
  end

  it "is not valid without answer" do
    test_reddit_answer.answer = nil
    expect(test_reddit_answer.save).to eq(false)
    expect(test_reddit_answer.errors[:answer]).to_not be_nil
  end

  it "should belong to user" do
    t = RedditAnswer.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should belong to reddit prompt" do
    t = RedditAnswer.reflect_on_association(:reddit)
    expect(t.macro).to eq(:belongs_to)
  end
end
