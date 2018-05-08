class PromptsController < ApplicationController
  def index
    render json: Prompt.all
  end

  def show
    render json: Prompt.find(params[:id])
  end
end
