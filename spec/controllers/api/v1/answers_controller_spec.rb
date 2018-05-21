require "rails_helper"

RSpec.describe Api::V1::AnswersController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#show" do
    it "should return a single answer" do
      user_1 = FactoryBot.create(:user)
      test_prompt1 = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: user_1)
      answer1 = Answer.create!(answer: "This is test answer 1 written by user_1 for AnswersController testing purposes", prompt: test_prompt1, user: user_1)

      get :show, params: { id: answer1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["answer"]["answer"]).to eq "This is test answer 1 written by user_1 for AnswersController testing purposes"

    end
  end
end
