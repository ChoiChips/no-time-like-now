class Api::V1::AnswersController < ApiController
  # before_action :authenticate_user!

  def create
    if current_user
      new_answer = Answer.new(answer_params)
      new_answer.user = current_user
      new_answer.prompt = Prompt.find(params[:prompt_id])
      new_answer.save
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:answer)
  end
end
