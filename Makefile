PYTHON = env/bin/python3
PIP = env/bin/pip
MANAGE = $(PYTHON) manage.py

.PHONY: static

env: requirements
	test -f $(PYTHON) || virtualenv --python=python3 --no-site-packages env
	$(PIP) install -U -r requirements/dev.txt

serve:
	$(MANAGE) runserver 0.0.0.0:5000

shell:
	$(MANAGE) shell

createdb:
	sudo -u postgres createuser -d -A -R -P channel_chat
	sudo -u postgres createdb -E UTF8 -O channel_chat channel_chat

migrate:
	$(MANAGE) migrate

static:
	# Assumes prior `nvm use 6`
	npm install
	npm run less
	npm run build
	$(MANAGE) collectstatic --noinput

test-py:
	$(MANAGE) test apps

test-js:
	# Assumes prior `nvm use 6`
	npm test

test: test-py test-js
