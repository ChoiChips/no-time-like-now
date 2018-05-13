class Api::V1::RedditsController < ApiController
  # skip_before_action :verify_authenticity_token
  # before_action :recent_answer

  def index
    render json: Reddit.all
  end

  def random
    random_prompt = Reddit.all.sample
    render json: random_prompt
  end

  def show
    render json: Reddit.find(params[:id])
  end

  def create
    new_prompt = Reddit.new(prompt_params)

    if user_signed_in?
      if new_prompt.save
        render json: new_prompt
      else
        render json: Reddit.where(description: prompt_params["description"])
      end
    else
      render json: ["Please sign in first"]
    end
  end

  private

  def prompt_params
    params.require(:prompt).permit(:description, :handle, :date_made)
  end
end
