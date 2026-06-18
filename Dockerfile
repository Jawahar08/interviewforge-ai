# Frontend Builder
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend Builder
FROM maven:3.9.6-eclipse-temurin-21-jammy AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Final Runtime Image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
COPY --from=frontend-builder /app/frontend/dist ./public
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
