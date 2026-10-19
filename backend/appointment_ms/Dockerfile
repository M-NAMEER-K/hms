# ---------- Build Stage ----------
FROM maven:3.9.9-eclipse-temurin-25 AS build

WORKDIR /app

# Copy pom.xml first
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests


# ---------- Runtime Stage ----------
FROM eclipse-temurin:25-jre

WORKDIR /app

# Copy generated jar
COPY --from=build /app/target/*.jar app.jar

# Appointment Service Port
EXPOSE 8083

# Start application
ENTRYPOINT ["java","-jar","app.jar"]