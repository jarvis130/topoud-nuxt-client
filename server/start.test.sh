#!/usr/bin/env bash
# # 切换nodejs版本
source ~/.nvm/nvm.sh
# # nvm use v8.9.4
nvm use v10.8.0
git reset HEAD --hard
git pull
# npm install --production 
rm -rf .nuxt
pm2 stop topoud-client-test-app
unzip .build.test.zip
pm2 start server/pm2.test.json