class Api::V1::WordAnswersController < ApiController
  # before_action :authenticate_user!

  def show
    render json: WordAnswer.find(params[:id]), serializer: WordAnswersSerializer
  end

  def create
    new_answer = WordAnswer.new(answer: params[:answer])
    new_answer.user = current_user

    if user_signed_in?
      if new_answer.save
        WordCombo.create!(word_answer: new_answer, word_id: params[:first])
        WordCombo.create!(word_answer: new_answer, word_id: params[:second])
        WordCombo.create!(word_answer: new_answer, word_id: params[:third])
        render json: new_answer.id
      else
        render json: new_answer.errors.full_messages
      end
    else
      render json: ["Please sign in first"]
    end
  end

  private

  def answer_params
    params.permit(:answer, :first, :second, :third)
  end
end
