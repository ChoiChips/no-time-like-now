class Api::V1::AnswersController < ApiController
  # before_action :authenticate_user!

  def show
    render json: Answer.find(params[:id])
  end

  def create
    new_answer = Answer.new(answer_params)
    new_answer.user = current_user

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
    params.require(:answer).permit(:answer, :prompt_id)
  end
end

# notes for checking if user has posted in past 24 hours
# beforeaction
# current user
# if thye posted
#   to prevent laoding wrong page need skip_before_action
#
# react router listen for routing, hijack event and check if user has posted
#   if so, allow route
#     if not redirect to post
#
# for json endpoints display 401 unauth or 403 if user has not posted.
#
#
# want layout component with children. Then in that componentWillReceiveProps will check to see
# if there is a current user and if current user has posted and not on post page, then will route them to post page.
#   In component will receive props will check children and change chilren and route accordingly
#   In component will mount will redirect using routing features to posting page if they have to post, otherwise let route process and
#   not change children.
#
#
# window.onfocus and onblur
