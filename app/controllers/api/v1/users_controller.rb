class Api::V1::UsersController < ApiController
  # serialization_scope :current_user
  # before_action :authenticate_user!

  def index
    if user_signed_in?
      render json: current_user
    else
      render json: {"user": {"recent_answer": false} }
    end
  end

  def show
    user = User.find(params[:id])
    render json: user
  end
end
