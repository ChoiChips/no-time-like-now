class CreateWordAnswer < ActiveRecord::Migration[5.2]
  def change
    create_table :word_answers do |t|
      t.string :answer, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
