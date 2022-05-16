class CreateEnemies < ActiveRecord::Migration[5.2]
  def change
    create_table :enemies, options: "DEFAULT CHARSET=utf8mb4" do |t|
      t.string :name, null: false
      t.string :image_url, null: false
      t.integer :hp, null: false
      t.integer :attack, null: false
      t.integer :defense, null: false
      t.timestamps
    end
  end
end
