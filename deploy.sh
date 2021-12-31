git pull
sudo kill -9 `sudo lsof -t -i:3030`
yarn install
yarn build
yarn generate
nohup yarn start &
echo 'done'
