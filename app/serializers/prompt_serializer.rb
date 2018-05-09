class PromptSerializer < ActiveModel::Serializer
  attributes :id, :description, :handle

  def handle
    user = User.find(object.user_id)
    user.handle
  end
end
