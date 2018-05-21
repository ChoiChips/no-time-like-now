class UserSerializer < ActiveModel::Serializer
  attributes :id, :handle, :is_current_user, :recent_answer
  has_many :prompts
  has_many :answers
  has_many :reddit_answers
  has_many :word_answers
  has_many :photo_answers

  def is_current_user
    object == current_user
  end

  def recent_answer
    most_recent_answer = Answer.where(user: current_user).order('created_at DESC').first

    if most_recent_answer.nil?
      return false
    elsif (most_recent_answer.created_at + 1.day) < Time.current
      return false
    end
    return true
  end
end
