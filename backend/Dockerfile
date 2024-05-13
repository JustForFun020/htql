FROM maven:3.8.5-openjdk-11 AS build

WORKDIR /usr/src/app

COPY . .

RUN mvn clean package

FROM adoptopenjdk/openjdk11:alpine-jre

WORKDIR /app

COPY --from=build /usr/src/app/target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
