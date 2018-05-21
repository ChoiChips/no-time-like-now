require "rails_helper"

RSpec.describe Api::V1::RedditsController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#index" do
    it "should return a list of all the prompts" do
      user_1 = FactoryBot.create(:user)
      reddit1 = Reddit.create!(description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")
      reddit2 = Reddit.create!(description: "This is test prompt 2, written by user_1, to be answered with a test response.", handle: "GaryScott112", date_made: "5/10/18", url: "www.test.com")

      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["description"]).to eq "This is test prompt 1, written by user_1, to be answered with a test response."
      expect(returned_json[0]["handle"]).to eq "GaryScott112"
      expect(returned_json[1]["description"]).to eq "This is test prompt 2, written by user_1, to be answered with a test response."
      expect(returned_json[1]["handle"]).to eq "GaryScott112"
    end
  end

  describe "POST#create" do
    it "creates a new Reddit prompt" do
      post_json = {
        prompt: {
          description: "This is test prompt 1, written by user_1, to be answered with a test response.",
          handle: "GaryScott112",
          date_made: "5/10/18",
          url: "www.test.com"
        }
      }

      prev_count = Reddit.count
      post(:create, params: post_json)
      expect(Reddit.count).to eq(prev_count + 1)
    end
  end
end
