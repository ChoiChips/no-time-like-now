class Api::V1::UsersController < ApiController
  # serialization_scope :current_user
  before_action :authenticate_user!

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    prompts = user.prompts
    answers = user.answers
    render json: {
      prompts: prompts,
      answers: answers
    }
  end
end
