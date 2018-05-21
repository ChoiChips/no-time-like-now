require 'rails_helper'

describe Answer do
  test_user = User.create!(handle: "test_user", email: "prompt_model@gmail.com", password: "password", password_confirmation: "password")
  test_prompt = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: test_user)
  test_answer = Answer.new(answer: "This is a test answer for test prompt 1. It must be a certain minimum length", user: test_user, prompt: test_prompt)

  it "is valid with valid attributes" do
    expect(test_answer).to be_valid
  end

  it "is not valid without answer" do
    test_answer.answer = nil
    expect(test_answer.save).to eq(false)
    expect(test_answer.errors[:answer]).to_not be_nil
  end

  it "should belong to user" do
    t = Answer.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should belong to prompt" do
    t = Answer.reflect_on_association(:prompt)
    expect(t.macro).to eq(:belongs_to)
  end
end
