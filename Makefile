install: #Эта команда полезна при первом клонировании репозитория (или после удаления node_modules
	npm ci

gendiff: #запускаем пакет gendiff.js
	node bin/gendiff.js

lint: # запускаем линтер
	npx eslint

test:
	npm test

publish: #
	npm publish --dry-run