class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.text :answer, null: false
      t.belongs_to :user
      t.belongs_to :prompt

      t.timestamps null: false
    end
  end
end
