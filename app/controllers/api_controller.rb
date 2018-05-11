class ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  # protect_from_forgery with: :null_session

  # def recent_answer
  #   if user_signed_in?
  #     most_recent_answer = Answer.where(user: current_user).order('created_at DESC').last
  #
  #     if (most_recent_answer.created_at + 1.day) < Time.current
  #       # redirect_to "localhost:3000"
  #       random_prompt = Prompt.all.sample.id
  #       redirect_to `http://localhost:3000/prompts/#{random_prompt}/new`
  #     end
  #   else
  #     redirect_to "http://localhost:3000/users/sign_in"
  #   end
  # end
end
