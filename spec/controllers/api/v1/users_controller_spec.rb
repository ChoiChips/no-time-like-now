require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:returned_json) { JSON.parse(response.body) }

  describe "GET#show" do
    it "should return a single answer" do
      user_1 = FactoryBot.create(:user)

      get :show, params: { id: user_1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["user"]["handle"]).to eq "user1"

    end
  end
end
