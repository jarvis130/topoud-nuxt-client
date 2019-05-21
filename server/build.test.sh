#!/usr/bin/env bash
cross-env
#killall node
NODE_ENV=test nuxt build -c ./nuxt.config.js
rm -rf .build.test.zip
zip -r .build.test.zip .nuxt
git add .build.test.zip
git commit -m build-test
git push
ssh root@221.229.196.233

