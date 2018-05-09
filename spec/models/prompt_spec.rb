require 'rails_helper'

describe Prompt do
  test_user = User.create!(handle: "test_user", email: "prompt_model@gmail.com", password: "password", password_confirmation: "password")
  test_prompt = Prompt.new(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: test_user)

  it "is valid with valid attributes" do
    expect(test_prompt).to be_valid
  end

  it "is not valid without description" do
    test_prompt.description = nil
    expect(test_prompt.save).to eq(false)
    expect(test_prompt.errors[:description]).to_not be_nil
  end

  # it "should have many reviews" do
  #   t = Prompt.reflect_on_association(:reviews)
  #   expect(t.macro).to eq(:has_many)
  # end

  it "should belong to user" do
    t = Prompt.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end
end
