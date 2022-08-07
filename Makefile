install:
	npm install
lint:
	npx eslint .
gendiff:
	node bin/index.js
test: 
	npm test
test-coverage:
	npx jest --collect-coverage
publish: 
	npm publish --dry-run