require "rails_helper"

RSpec.describe Api::V1::PromptsController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#index" do
    it "should return a list of all the prompts" do
      user_1 = FactoryBot.create(:user)
      test_prompt1 = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: user_1)
      test_prompt2 = Prompt.create!(description: "This is test prompt 2, written by user_1, to be answered with a test response.", user: user_1)
      test_prompt3 = Prompt.create!(description: "This is test prompt 3, written by user_1, to be answered with a test response.", user: user_1)

      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["description"]).to eq "This is test prompt 1, written by user_1, to be answered with a test response."
      expect(returned_json[1]["description"]).to eq "This is test prompt 2, written by user_1, to be answered with a test response."
      expect(returned_json[2]["description"]).to eq "This is test prompt 3, written by user_1, to be answered with a test response."
    end
  end
end
