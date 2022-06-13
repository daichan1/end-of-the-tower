class AddEffectTypeIdToCards < ActiveRecord::Migration[5.2]
  def up
    add_reference :cards, :effect_type, foreign_key: true, after: :player_id
  end

  def down
    remove_reference :cards, :effect_type, foreign_key: true, after: :player_id
  end
end
