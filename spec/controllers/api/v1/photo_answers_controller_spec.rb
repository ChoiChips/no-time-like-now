require "rails_helper"

RSpec.describe Api::V1::PhotoAnswersController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#show" do
    it "should return a single photo answer" do
      user_1 = FactoryBot.create(:user)
      photo_answer = PhotoAnswer.create!(answer: "This is test photo answer, written by user_1. It must be a minimum length.", url: "www.test.com", user: user_1)

      get :show, params: { id: photo_answer.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 6
      expect(returned_json["answer"]).to eq "This is test photo answer, written by user_1. It must be a minimum length."
      expect(returned_json["url"]).to eq "www.test.com"

    end
  end
end
