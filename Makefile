PYTHON = env/bin/python3
PIP = env/bin/pip
MANAGE = $(PYTHON) manage.py

env: requirements
	test -f $(PYTHON) || virtualenv --python=python3 --no-site-packages env
	$(PIP) install -U -r requirements/dev.txt

serve: env
	$(MANAGE) runserver 0.0.0.0:5000

shell:
	$(MANAGE) shell

createdb:
	sudo -u postgres createuser -d -A -R -P channel_chat
	sudo -u postgres createdb -T template_postgis -E UTF8 -O channel_chat channel_chat

migrate:
	$(MANAGE) migrate

test:
	$(MANAGE) test apps


