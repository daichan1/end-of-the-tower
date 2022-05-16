require 'csv'

# レコード作成用タスク
namespace :create_recode do
  desc "create players recode"
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
end