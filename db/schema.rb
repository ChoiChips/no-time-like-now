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

ActiveRecord::Schema.define(version: 2018_05_18_213504) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.text "answer", null: false
    t.bigint "user_id"
    t.bigint "prompt_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["prompt_id"], name: "index_answers_on_prompt_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "prompts", force: :cascade do |t|
    t.text "description", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_prompts_on_user_id"
  end

  create_table "reddit_answers", force: :cascade do |t|
    t.text "answer", null: false
    t.bigint "user_id"
    t.bigint "reddit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reddit_id"], name: "index_reddit_answers_on_reddit_id"
    t.index ["user_id"], name: "index_reddit_answers_on_user_id"
  end

  create_table "reddits", force: :cascade do |t|
    t.text "description", null: false
    t.string "handle", null: false
    t.string "date_made", null: false
    t.string "url", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "handle", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["handle"], name: "index_users_on_handle", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "word_answers", force: :cascade do |t|
    t.string "answer", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_word_answers_on_user_id"
  end

  create_table "word_combos", force: :cascade do |t|
    t.bigint "word_id"
    t.bigint "word_answer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["word_answer_id"], name: "index_word_combos_on_word_answer_id"
    t.index ["word_id"], name: "index_word_combos_on_word_id"
  end

  create_table "words", force: :cascade do |t|
    t.string "word", null: false
    t.string "definition", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
