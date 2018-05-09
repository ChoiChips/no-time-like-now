class Api::V1::UsersController < ApiController
  serialization_scope :current_user

  def index
    if user_signed_in? && !current_user.nil?

      user = User.find(current_user.id)
      prompts = user.prompts
      render json: prompts

    else
      redirect_to root_path
    end
  end
end
