class CreateEffectTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :effect_types, options: "DEFAULT CHARSET=utf8mb4" do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
