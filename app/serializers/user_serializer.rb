class UserSerializer < ActiveModel::Serializer
  attributes :id, :handle, :is_current_user
  has_many :prompts

  def is_current_user
    object == current_user
  end
end
