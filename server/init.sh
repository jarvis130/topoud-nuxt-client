# 同步代码
# git clone git@gitee.com:topoud/topoud-nuxt-client.git

# 安装node管理工具 nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source ~/.bashrc
# 安装node版本 v8.9.4 并启动
nvm install v8.9.4
nvm use v8.9.4
cd topoud-nuxt-client
# 安装项目依赖
npm install --production
# 安装pm2启动器
npm install -g pm2