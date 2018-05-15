class CreateRedditAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :reddit_answers do |t|
      t.text :answer, null: false
      t.belongs_to :user
      t.belongs_to :reddit

      t.timestamps null: false
    end
  end
end
