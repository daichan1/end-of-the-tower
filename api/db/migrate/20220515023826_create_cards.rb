class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards, options: "DEFAULT CHARSET=utf8mb4" do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image_url, null: false
      t.integer :cost, null: false
      t.string :type, null: false
      t.integer :attack, null: false
      t.integer :defense, null: false
      t.references :player, null: false, foreign_key: true
      t.timestamps
    end
  end
end
