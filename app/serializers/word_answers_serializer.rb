class WordAnswersSerializer < ActiveModel::Serializer
  attributes :id, :answer, :date_made, :handle, :user_id, :length, :words

  def handle
    user = User.find(object.user_id)
    user.handle
  end

  def date_made
    utc = object.created_at
    date = utc.strftime("%m/%d/%Y")
  end

  def length
    object.answer.split.size
  end

  def words
    words = object.words
  end
end
