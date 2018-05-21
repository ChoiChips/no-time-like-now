class Api::V1::PhotoAnswersController < ApiController

  def index
    render json: PhotoAnswer.where(user: current_user)
  end

  def show
    render json: PhotoAnswer.find(params[:id])
  end

  def create
    new_photo_answer = PhotoAnswer.new(answer_params)
    new_photo_answer.user = current_user

    if user_signed_in?
      if new_photo_answer.save
        # render json: ["Answer successfully recorded"]
        render json: new_photo_answer
      else
        render json: new_photo_answer.errors.full_messages
      end
    else
      render json: ["Please sign in first"]
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:answer, :url)
  end
end
