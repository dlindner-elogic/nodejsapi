echo "Updating the web.config file"
sed -i.bak 's/\<\/system.webServer\> /\<staticContent\>\<mimeMap fileExtension=".json" mimeType="application\/json" \/\>\<\/staticContent\>\<\/system.webServer\>' ./../wwwroot/web.config
::rm -f ./../wwwroot/web.config.bak