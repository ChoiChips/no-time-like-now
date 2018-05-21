require 'rails_helper'

describe Reddit do
  test_reddit = Reddit.new(description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")

  it "is valid with valid attributes" do
    expect(test_reddit).to be_valid
  end

  it "is not valid without description" do
    test_reddit.description = nil
    expect(test_reddit.save).to eq(false)
    expect(test_reddit.errors[:description]).to_not be_nil
  end

  it "is not valid without handle" do
    test_reddit.handle = nil
    expect(test_reddit.save).to eq(false)
    expect(test_reddit.errors[:handle]).to_not be_nil
  end

  it "is not valid without date" do
    test_reddit.date_made = nil
    expect(test_reddit.save).to eq(false)
    expect(test_reddit.errors[:date_made]).to_not be_nil
  end

  it "should have many reddit answers" do
    t = Reddit.reflect_on_association(:reddit_answers)
    expect(t.macro).to eq(:has_many)
  end
end
