class StaticPagesController < ApplicationController
  before_action :authenticate_user!

# consider moving to either API controller or application controller?
  # private
  # def recent_answer
  #   if user_signed_in?
  #     most_recent_answer = Answer.where(user: current_user).order('created_at DESC').last
  #     if most_recent_answer.nil?
  #       # infinite loop, consider having additional condition checking path
  #       random_prompt = Prompt.all.sample.id
  #       redirect_to '/prompts/#{random_prompt}/new', notice: "Please submit a response"
  #     elsif (most_recent_answer.created_at + 1.day) < Time.current
  #       random_prompt = Prompt.all.sample.id
  #       redirect_to '/prompts/#{random_prompt}/new', notice: "Please submit a response"
  #     end
  #   else
  #     redirect_to "/users/sign_in", notice: "Please sign in"
  #   end
  # end
end
