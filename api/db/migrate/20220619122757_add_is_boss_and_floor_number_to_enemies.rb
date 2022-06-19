class AddIsBossAndFloorNumberToEnemies < ActiveRecord::Migration[5.2]
  def up
    add_column :enemies, :is_boss, :boolean, null: false, default: false, after: :defense
    add_column :enemies, :floor_number, :integer, null: false, default: 1, after: :defense
  end

  def down
    remove_column :enemies, :is_boss, :boolean, null: false, default: false, after: :defense
    remove_column :enemies, :floor_number, :integer, null: false, default: 1, after: :defense
  end
end
