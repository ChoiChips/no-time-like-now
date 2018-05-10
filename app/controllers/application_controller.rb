class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:email, :password, :password_confirmation, :handle)
    end
  end

  def authenticate_user!
    if user_signed_in?
      most_recent_answer = Answer.find(user: current_user).order('created_at DESC').last

      if (most_recent_answer.created_at + 1.day) < Time.current
        # redirect_to "localhost:3000"
        render json: ["Please respond to prompt"]
      end

      super
    else
      flash[:error] = "Please sign in to gain access to site"
      # redirect_to "localhost:3000"
      render json: ["Please respond to prompt"]
    end
  end
end
