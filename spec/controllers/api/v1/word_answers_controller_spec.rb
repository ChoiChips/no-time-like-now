require "rails_helper"

RSpec.describe Api::V1::WordAnswersController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#show" do
    it "should return a list of all the word answers" do
      user_1 = FactoryBot.create(:user)
      word_1 = Word.create!(word: "Test1", definition: "Something to be done to check code1")
      word_2 = Word.create!(word: "Test2", definition: "Something to be done to check code2")
      word_3 = Word.create!(word: "Test3", definition: "Something to be done to check code3")
      word_answer_1 = WordAnswer.create!(answer: "This is a test word answer for 3 test words. It must be minimum 50 characters long", user: user_1)

      get :show, params: { id: word_answer_1.id, first: word_1, second: word_2, third: word_3 }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["word_answer"]["answer"]).to eq "This is a test word answer for 3 test words. It must be minimum 50 characters long"
    end
  end
end
