require 'csv'

# レコード作成用タスク
namespace :create_record do
  desc "create players record"
  task players: :environment do
    begin
      csv_path = Rails.root.join("tmp/player_data.csv")
    rescue
      puts "ファイルが存在していません"
      return
    end

    ActiveRecord::Base.transaction do
      CSV.foreach(csv_path, headers: true) do |data|
        player = Player.new(
          name: data['name'],
          image_url: data['image_url'],
          hp: data['hp'],
          attack: data['attack'],
          defense: data['defense'],
          energy: data['energy']
        )
        player.save!
      end
    end
  end

  desc "create enemies record"
  task enemies: :environment do
    begin
      csv_path = Rails.root.join("tmp/enemy_data.csv")
    rescue
      puts "ファイルが存在していません"
      return
    end

    ActiveRecord::Base.transaction do
      CSV.foreach(csv_path, headers: true) do |data|
        enemy = Enemy.new(
          name: data['name'],
          image_url: data['image_url'],
          hp: data['hp'],
          attack: data['attack'],
          defense: data['defense']
        )
        enemy.save!
      end
    end
  end

  desc "create cards record"
  task cards: :environment do
    begin
      csv_path = Rails.root.join("tmp/card_data.csv")
    rescue
      puts "ファイルが存在していません"
      return
    end

    ActiveRecord::Base.transaction do
      CSV.foreach(csv_path, headers: true) do |data|
        card = Card.new(
          name: data['name'],
          description: data['description'],
          image_url: data['image_url'],
          cost: data['cost'],
          card_type: data['card_type'],
          attack: data['attack'],
          defense: data['defense'],
          action_name: data['action_name'],
          execution_count: data['execution_count'],
          player_id: data['player_id'],
          effect_type_id: data['effect_type_id']
        )
        card.save!
      end
    end
  end
end
