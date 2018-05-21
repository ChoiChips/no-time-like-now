require "rails_helper"

RSpec.describe Api::V1::RedditAnswersController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#index" do
    it "should return a list of all the reddit answers" do
      user_1 = FactoryBot.create(:user)
      reddit1 = Reddit.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")
      reddit_answer1 = RedditAnswer.create!(answer: "This is test answer 2, written by user_1, for test prompt. It must be a certain length", user: user_1, reddit: reddit1)

      get :index, params: { reddit_id: reddit1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]["answer"]).to eq "This is test answer 2, written by user_1, for test prompt. It must be a certain length"
    end
  end

  describe "GET#show" do
    it "should return a single answer" do
      user_1 = FactoryBot.create(:user)
      reddit1 = Reddit.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")
      reddit_answer1 = RedditAnswer.create!(answer: "This is test answer 2, written by user_1, for test prompt. It must be a certain length", user: user_1, reddit: reddit1)

      get :show, params: { reddit_id: reddit1.id, id: reddit_answer1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 6
      expect(returned_json["answer"]).to eq "This is test answer 2, written by user_1, for test prompt. It must be a certain length"

    end
  end
end
