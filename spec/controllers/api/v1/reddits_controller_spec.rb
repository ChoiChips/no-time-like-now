require "rails_helper"

RSpec.describe Api::V1::RedditsController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#index" do
    it "should return a list of all the reddit prompts" do
      user_1 = FactoryBot.create(:user)

      tests = 2
      reddits = []

      tests.times do |index|
        reddits << Reddit.create!(
          description: "This is test prompt #{index}, written by user_#{index}, to be answered with a test response.",
          handle: "GaryScott112",
          date_made: "5/10/18",
          url: "www.test.com"
        )
      end

      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq reddits.length

      reddits.each_with_index do |reddit, index|
        expect(returned_json[index]["description"]).to eq reddit["description"]
        expect(returned_json[index]["handle"]).to eq reddit["handle"]
      end
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
