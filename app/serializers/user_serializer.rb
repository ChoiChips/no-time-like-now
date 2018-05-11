class UserSerializer < ActiveModel::Serializer
  attributes :id, :handle, :is_current_user, :recent_answer
  has_many :prompts
  has_many :answers

  def is_current_user
    object == current_user
  end

  def recent_answer
    most_recent_answer = Answer.where(user: current_user).order('created_at DESC').last

    if (most_recent_answer.created_at + 1.day) < Time.current
      return false
    end
    return true
  end

end
