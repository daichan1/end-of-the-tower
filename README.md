# End-of-the-Tower

## 概要
- Webブラウザでローグライクカードゲームが遊べる
- 塔の頂上を目指す

## 開発環境
- gitのクローン
```
git clone git@github.com:daichan1/end-of-the-tower.git
```
- 環境変数の設定

client
```
$ cp client/.env.dev client/.env
$ cp api/.env.dev api/.env
$ cp docker/db/db-variables.env.dev docker/db/db-variables.env
```
- nginxの設定ファイルの作成
```

```
- イメージのビルド&起動
```
docker-compose up -d --build
```

- dbの作成
```
docker-compose exec api rails db:create
```

- dbのマイグレーション
```
docker-compose exec api rails db:migrate
```
