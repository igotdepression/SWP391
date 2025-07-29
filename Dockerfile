FROM openjdk:17-jdk-slim

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy pom.xml
COPY backend/pom.xml .

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean install -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/dna-testing-service-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"] 