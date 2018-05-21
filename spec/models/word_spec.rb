require 'rails_helper'

describe Word do
  test_word = Word.new(word: "Test1", definition: "Something to be done to check code1")

  it "is valid with valid attributes" do
    expect(test_word).to be_valid
  end

  it "is not valid without word" do
    test_word.word = nil
    expect(test_word.save).to eq(false)
    expect(test_word.errors[:description]).to_not be_nil
  end

  it "is not valid without definition" do
    test_word.definition = nil
    expect(test_word.save).to eq(false)
    expect(test_word.errors[:definition]).to_not be_nil
  end

  it "should have many word combos" do
    t = Word.reflect_on_association(:word_combos)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many word answers" do
    t = Word.reflect_on_association(:word_answers)
    expect(t.macro).to eq(:has_many)
  end
end
