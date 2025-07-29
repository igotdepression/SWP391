FROM openjdk:17-jdk-slim

# Cài Maven
RUN apt-get update && apt-get install -y maven

# Set thư mục làm việc đúng nơi chứa pom.xml
WORKDIR /app/backend

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build bằng Maven
RUN mvn clean install -DskipTests

# Expose port
EXPOSE 8080

# Chạy ứng dụng
CMD ["java", "-jar", "target/dna-testing-service-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]
