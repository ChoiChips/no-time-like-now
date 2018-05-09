require "rails_helper"

RSpec.describe Api::V1::PromptsController, type: :controller do

  user_1 = User.create!(email: "test@gmail.com", password: "password", password_confirmation: "password")
  test_prompt1 = Prompt.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: user_1)
  test_prompt2 = Prompt.create!(description: "This is test prompt 2, written by user_1, to be answered with a test response.", user: user_1)
  test_prompt3 = Prompt.create!(description: "This is test prompt 3, written by user_1, to be answered with a test response.", user: user_1)

  describe "GET#index" do
    it "should return a list of all the prompts" do
      get :index
      returned_json = JSON.parse(response.body)
    end

    it "should return a list of all the prompts ordered by date" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["description"]).to eq "This is test prompt 1, written by user_1, to be answered with a test response."
      expect(returned_json[1]["description"]).to eq "This is test prompt 2, written by user_1, to be answered with a test response."
      expect(returned_json[2]["description"]).to eq "This is test prompt 3, written by user_1, to be answered with a test response."
    end
  end
end
