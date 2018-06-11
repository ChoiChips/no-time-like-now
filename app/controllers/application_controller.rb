class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:email, :password, :password_confirmation, :handle)
    end
  end

  def after_sign_in_path_for(resource)
    if request.referrer =~ /sign\_up/
      #new user coming from Sign Up page
      '/prompts/random'
    else
      "/users/#{current_user.id}"
    end
  end


end
