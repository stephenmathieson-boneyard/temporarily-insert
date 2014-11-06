
BIN := node_modules/.bin
REPORTER ?= spec
BROWSER ?= chrome
PORT ?= 5678

all: node_modules build.js

build.js: demo.js index.js
	$(BIN)/duo --development --type js < demo.js > build.js

node_modules: package.json
	@npm install
	@touch $@

test: node_modules tests.js
	$(BIN)/duo-test phantomjs --reporter $(REPORTER) --build tests.js

test-browser: node_modules tests.js
	$(BIN)/duo-test browser $(BROWSER) \
	  --reporter $(REPORTER) \
	  --build tests.js \
	  --port $(PORT) \
	  --commands "make tests.js"

tests.js: index.js test/index.js
	$(BIN)/duo --type js --development < test/index.js > tests.js

clean:
	rm -rf components build.js build.css

.PHONY: clean
