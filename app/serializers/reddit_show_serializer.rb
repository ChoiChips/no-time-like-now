class RedditShowSerializer < ActiveModel::Serializer
  attributes :id, :description, :handle, :date_made, :user_answers
  has_many :reddit_answers

  def user_answers
    object.reddit_answers.where(user: scope)
  end
end
