class CreateWordCombo < ActiveRecord::Migration[5.2]
  def change
    create_table :word_combos do |t|
      t.belongs_to :word, index: true
      t.belongs_to :word_answer, index: true

      t.timestamps
    end
  end
end
