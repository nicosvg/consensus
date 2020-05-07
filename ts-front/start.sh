echo "Writing environment variables"
envsub ./dist/environment.template.js ./dist/environment.js
echo "Starting server"
http-server dist
