class RenameTypeColumnToCardType < ActiveRecord::Migration[5.2]
  def up
    rename_column :cards, :type, :card_type
  end

  def down
    rename_column :cards, :card_type, :type
  end
end
