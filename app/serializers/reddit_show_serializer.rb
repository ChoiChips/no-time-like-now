class RedditShowSerializer < ActiveModel::Serializer
  attributes :id, :description, :handle, :date_made, :url, :user_answers
  has_many :reddit_answers, serializer: RedditAnswersSerializer

  def user_answers
    object.reddit_answers.where(user: scope)
  end
end
