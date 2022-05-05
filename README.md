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
$ cd client
$ touch .env

# .envの中身
PORT=3333

REACT_APP_API_URL=http://nginx:80/api
REACT_APP_API_URL_BROWSER=http://localhost:3000/api
```
api
```
$ cd api
$ touch .env

# .envの中身
MYSQL_USER=development
MYSQL_PASSWORD=password
MYSQL_DEVELOPMENT_DATABASE=end_of_the_tower_development
MYSQL_ROOT_PASSWORD=jvjc7n9r
MYSQL_TEST_DATABASE=end_of_the_tower_test
MYSQL_PRODUCTION_DATABASE=end_of_the_tower_production
```
db
```
$ cd docker/db
$ touch db-variables.env

# db-variables.envの中身
MYSQL_USER=development
MYSQL_PASSWORD=password
MYSQL_DATABASE=end_of_the_tower_development
MYSQL_ROOT_PASSWORD=jvjc7n9r
```
- nginxの設定ファイルの作成
```

```
- イメージのビルド&起動
```
docker-compose up -d --build
```
