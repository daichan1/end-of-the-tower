class AddExecutionCountToCards < ActiveRecord::Migration[5.2]
  def up
    add_column :cards, :execution_count, :integer, null: false, default: 1, after: :action_name
  end

  def down
    remove_column :cards, :execution_count, :integer, null: false, default: 1, after: :action_name
  end
end
