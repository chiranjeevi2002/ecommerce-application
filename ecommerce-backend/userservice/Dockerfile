# Stage 1: Build with Maven
FROM maven:3.9.4-eclipse-temurin-17 as builder
WORKDIR /workspace
COPY pom.xml .
# copy parent and module poms if monorepo; copy minimal to speed up build caching
COPY .mvn .mvn
COPY mvnw mvnw
# copy everything and build
COPY . .
RUN mvn -B -DskipTests package -DskipITs

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
ARG JAR_FILE=target/*.jar
WORKDIR /app
COPY --from=builder /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app/app.jar"]
