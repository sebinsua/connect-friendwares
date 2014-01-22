REPORTER = dot

test:
	@./node_modules/.bin/mocha --reporter $(REPORTER)
	@./node_modules/.bin/jshint index.js

.PHONY: test