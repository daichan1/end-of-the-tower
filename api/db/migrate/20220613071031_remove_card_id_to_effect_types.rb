class RemoveCardIdToEffectTypes < ActiveRecord::Migration[5.2]
  def up
    remove_reference :effect_types, :card, foreign_key: true, after: :name
  end

  def down
    add_reference :effect_types, :card, foreign_key: true, after: :name
  end
end
