require 'rails_helper'

describe PhotoAnswer do
  test_user = User.create!(handle: "photo_answer_user", email: "photo_answer@gmail.com", password: "password", password_confirmation: "password")
  test_photo_answer = PhotoAnswer.new(answer: "This is a test answer for test photo. It must be a certain minimum length", user: test_user, url: "www.test.com")

  it "is valid with valid attributes" do
    expect(test_photo_answer).to be_valid
  end

  it "is not valid without answer" do
    test_photo_answer.answer = nil
    expect(test_photo_answer.save).to eq(false)
    expect(test_photo_answer.errors[:answer]).to_not be_nil
  end

  it "is not valid without url" do
    test_photo_answer.url = nil
    expect(test_photo_answer.save).to eq(false)
    expect(test_photo_answer.errors[:url]).to_not be_nil
  end

  it "should belong to user" do
    t = PhotoAnswer.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end
end
