class PromptSerializer < ActiveModel::Serializer
  attributes :id, :description, :handle, :date_made
  belongs_to :user

  def handle
    user = User.find(object.user_id)
    user.handle
  end

  def date_made
    utc = object.created_at
    date = utc.strftime("%m/%d/%Y")
  end
end
