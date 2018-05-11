class Api::V1::PromptsController < ApiController
  # skip_before_action :verify_authenticity_token
  # before_action :recent_answer

  def index
    render json: Prompt.all
  end

  def show
    render json: Prompt.find(params[:id]), serializer: PromptShowSerializer
  end

  def create
    new_prompt = Prompt.new(prompt_params)
    new_prompt.user = current_user

    if user_signed_in?
      if new_prompt.save
        render json: ["Successfully added"]
      else
        render json: new_prompt.errors.full_messages
      end
    else
      render json: ["Please sign in first"]
    end
  end

  private

  def prompt_params
    params.require(:prompt).permit(:description)
  end
end
