.PHONY: help build up down seed test

help:
	@echo "Waste Reduction Automation - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build     : Build all containers"
	@echo "up        : Start all services"
	@echo "down      : Stop all services"
	@echo "detect    : Run waste detection scans"
	@echo "remediate : Execute pending remediation actions"
	@echo "test      : Run system tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

detect:
	python scripts/detect/scan_resources.py

remediate:
	python scripts/remediate/execute_actions.py

test:
	pytest tests/
