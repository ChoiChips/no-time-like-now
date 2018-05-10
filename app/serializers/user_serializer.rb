class UserSerializer < ActiveModel::Serializer
  attributes :id, :handle, :is_current_user
  has_many :prompts
  has_many :answers

  def is_current_user
    object == current_user
  end
end
