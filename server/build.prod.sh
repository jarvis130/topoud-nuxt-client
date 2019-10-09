#!/usr/bin/env bash
cross-env
#killall node
NODE_ENV=production nuxt build -c ./nuxt.config.js
rm -rf .build.prod.zip
zip -r .build.prod.zip .nuxt
git add .build.prod.zip
git commit -m build-production
git push
ssh root@47.111.16.143 " cd topoud-nuxt-client; sh server/start.prod.sh; "