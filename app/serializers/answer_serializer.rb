class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :answer, :date_made, :handle

  def handle
    user = User.find(object.user_id)
    user.handle
  end

  def date_made
    utc = object.created_at
    date = utc.strftime("%m/%d/%Y")
  end
end
