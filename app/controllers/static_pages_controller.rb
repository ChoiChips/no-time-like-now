class StaticPagesController < ApplicationController
  before_action :authenticate_user!

  # private
  # def recent_answer
  #   if user_signed_in?
  #     most_recent_answer = Answer.where(user: current_user).order('created_at DESC').last
  #     if most_recent_answer.nil?
  #       random_prompt = Prompt.all.sample.id
  #       binding.pry
  #       redirect_to `http://localhost:3000/prompts/#{random_prompt}/new`, notice: "Please submit a response"
  #     elsif (most_recent_answer.created_at + 1.day) < Time.current
  #       random_prompt = Prompt.all.sample.id
  #       redirect_to `http://localhost:3000/prompts/#{random_prompt}/new`, notice: "Please submit a response"
  #     end
  #   else
  #     redirect_to "http://localhost:3000/users/sign_in", notice: "Please sign in"
  #   end
  # end
end
