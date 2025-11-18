#!/bin/sh

CONFIG_FILE_PATH=/usr/share/nginx/html/config.js

echo "Gerando arquivo de configuração em ${CONFIG_FILE_PATH}..."
echo "Config: APP_URL: ${APP_URL}"
echo "Config: APP_VERSION: ${APP_VERSION}"

cat <<EOF > ${CONFIG_FILE_PATH}
window.config = {
  API_URL: "${APP_URL}",
    APP_VERSION: "${APP_VERSION}"
};
EOF

echo "Configuração gerada."

exec nginx -g 'daemon off;'