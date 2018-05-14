class Api::V1::AnswersController < ApiController

  def show
    render json: RedditAnswer.find(params[:id])
  end

  def create
    new_answer = RedditAnswer.new(answer_params)
    new_answer.user = current_user
    new_answer.reddit = Reddit.find(params[:reddit_id])

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
    params.require(:answer).permit(:answer)
  end
end
