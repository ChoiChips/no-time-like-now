class CreatePrompts < ActiveRecord::Migration[5.2]
  def change
    create_table :prompts do |t|
      t.text :description, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
