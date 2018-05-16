class PromptShowSerializer < ActiveModel::Serializer
  attributes :id, :description, :handle, :date_made, :user_answers
  has_many :answers
  belongs_to :user

  def handle
    user = User.find(object.user_id)
    user.handle
  end

  def date_made
    utc = object.created_at
    date = utc.strftime("%m/%d/%Y")
  end

  def user_answers
    object.answers.where(user: scope)
  end
end
