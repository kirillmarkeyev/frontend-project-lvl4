start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

lint:
	npx eslint --ext js,jsx --fix --no-eslintrc --config .eslintrc.yml .
