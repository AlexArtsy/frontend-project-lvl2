install: #Эта команда полезна при первом клонировании репозитория (или после удаления node_modules
	npm ci

gendiff: #запускаем пакет gendiff.js
	node bin/gendiff.js

publish: #
	npm publish --dry-run

lint: # запускаем линтер
	npx eslint