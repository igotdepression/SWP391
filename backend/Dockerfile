FROM openjdk:17-jdk-slim

WORKDIR /app

# Cài Maven
RUN apt-get update && apt-get install -y maven

# Copy toàn bộ project
COPY . .

# Build bằng Maven
RUN mvn clean install -DskipTests

# Expose port
EXPOSE 8080

# Chạy Spring Boot
CMD ["java", "-jar", "target/dna-testing-service-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]
