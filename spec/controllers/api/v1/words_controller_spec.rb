require "rails_helper"

RSpec.describe Api::V1::WordsController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#index" do
    it "should return a list of all the words" do
      user_1 = FactoryBot.create(:user)
      word1 = Word.create!(word: "Test1", definition: "Something to be done to check code1")
      word2 = Word.create!(word: "Test2", definition: "Something to be done to check code2")

      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["word"]).to eq "Test1"
      expect(returned_json[0]["definition"]).to eq "Something to be done to check code1"
      expect(returned_json[1]["word"]).to eq "Test2"
      expect(returned_json[1]["definition"]).to eq "Something to be done to check code2"
    end
  end

  describe "GET#random" do
    it "should return three random words" do
      user_1 = FactoryBot.create(:user)
      word1 = Word.create!(word: "Test1", definition: "Something to be done to check code1")
      word2 = Word.create!(word: "Test2", definition: "Something to be done to check code2")
      word2 = Word.create!(word: "Test3", definition: "Something to be done to check code3")

      get :random

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
    end
  end
end
