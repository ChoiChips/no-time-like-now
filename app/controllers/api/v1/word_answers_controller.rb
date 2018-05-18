class Api::V1::AnswersController < ApiController
  # before_action :authenticate_user!

  def show
    render json: WordAnswer.find(params[:id])
  end

  def create
    # not sure if this will work
    new_answer = WordAnswer.new(answer_params)
    new_answer.user = current_user
    # new_answer.prompt = Prompt.find(params[:prompt_id])

    if user_signed_in?
      if new_answer.save
        # render json: ["Answer successfully recorded"]
        render json: new_answer
      else
        render json: new_answer.errors.full_messages
      end
    else
      render json: ["Please sign in first"]
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:answer, :word_one, :word_two, :word_three)
  end
end
