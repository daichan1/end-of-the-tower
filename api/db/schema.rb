# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_19_122757) do

  create_table "cards", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "image_url", null: false
    t.integer "cost", null: false
    t.string "card_type", null: false
    t.integer "attack", null: false
    t.integer "defense", null: false
    t.string "action_name", null: false
    t.integer "execution_count", default: 1, null: false
    t.bigint "player_id", null: false
    t.bigint "effect_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["effect_type_id"], name: "index_cards_on_effect_type_id"
    t.index ["player_id"], name: "index_cards_on_player_id"
  end

  create_table "effect_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "enemies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_url", null: false
    t.integer "hp", null: false
    t.integer "attack", null: false
    t.integer "defense", null: false
    t.integer "floor_number", default: 1, null: false
    t.boolean "is_boss", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_url", null: false
    t.integer "hp", null: false
    t.integer "attack", null: false
    t.integer "defense", null: false
    t.integer "energy", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "cards", "effect_types"
  add_foreign_key "cards", "players"
end
