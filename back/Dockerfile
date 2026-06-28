# ─── Stage 1 : Build ───────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copier le pom.xml et télécharger les dépendances (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier les sources et compiler
COPY src ./src
RUN mvn clean package -DskipTests -B

# ─── Stage 2 : Run ─────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copier uniquement le JAR final
COPY --from=build /app/target/*.jar app.jar

# Port exposé
EXPOSE 8080

# Lancement
ENTRYPOINT ["java", "-jar", "app.jar"]
