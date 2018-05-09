class Api::V1::UsersController < ApiController
  serialization_scope :current_user

  def index
    render json: current_user
  end

  def show
    user = User.find(params[:id])
    prompts = user.prompts
    render json: prompts
  end
end
