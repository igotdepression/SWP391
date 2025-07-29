FROM openjdk:17-jdk-slim

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy full backend project
COPY backend/ .

# Build the application
RUN mvn clean install -DskipTests

# Expose the port used by Spring Boot
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/dna-testing-service-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]
