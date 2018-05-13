class CreateReddit < ActiveRecord::Migration[5.2]
  def change
    create_table :reddits do |t|
      t.text :description, null: false
      t.string :handle, null: false
      t.string :date_made, null: false

    end
  end
end
