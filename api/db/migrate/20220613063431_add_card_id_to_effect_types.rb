class AddCardIdToEffectTypes < ActiveRecord::Migration[5.2]
  def up
    add_reference :effect_types, :card, foreign_key: true, after: :name
  end

  def down
    remove_reference :effect_types, :card, foreign_key: true, after: :name
  end
end
