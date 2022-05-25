class AddActionNameToCards < ActiveRecord::Migration[5.2]
  def up
    add_column :cards, :action_name, :string, null: false, after: :defense
  end

  def down
    remove_column :cards, :action_name, :string, null: false, after: :defense
  end
end
