.PHONY: start-backend start-frontend start-admin start-all

start-backend:
	cd backend && mvn spring-boot:run

start-frontend:
	cd frontend && npm run dev

start-admin:
	cd admin-panel && npm run dev

start-all:
	docker-compose up --build

clean:
	cd backend && mvn clean
	cd frontend && rm -rf node_modules dist
	cd admin-panel && rm -rf node_modules dist
