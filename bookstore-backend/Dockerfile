# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY pom.xml ./

COPY . .

RUN mvn clean package -DskipTests

# For Java 8, try this
# FROM openjdk:8-jdk-alpine

# For Java 11, try this
FROM openjdk:17-jdk-alpine

# Refer to Maven build -> finalName
ARG JAR_FILE=/app/target/BookStoreServer-0.0.1-SNAPSHOT.jar

# cd /opt/app
WORKDIR /opt/app

# cp target/spring-boot-web.jar /opt/app/app.jar
COPY --from=build ${JAR_FILE} app.jar

# java -jar /opt/app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
