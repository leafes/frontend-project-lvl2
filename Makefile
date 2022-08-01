install:
	npm install
lint:
	npx eslint .
gendiff:
	node bin/index.js
test: 
	npm test
publish: 
	npm publish --dry-run