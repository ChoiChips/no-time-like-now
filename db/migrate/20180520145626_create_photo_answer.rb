class CreatePhotoAnswer < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :url, null: false
      t.string :answer, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
