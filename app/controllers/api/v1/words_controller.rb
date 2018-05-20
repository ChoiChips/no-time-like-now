class Api::V1::WordsController < ApiController
  # skip_before_action :verify_authenticity_token
  # before_action :recent_answer

  def index
    render json: Word.all
  end

  def random
    random_words = Word.all.sample(3)
    render json: random_words
  end
end
