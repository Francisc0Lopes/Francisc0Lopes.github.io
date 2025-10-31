# Como usei Docker num projeto Java

**Publicado:** 15 de Outubro de 2025  
**Tags:** DevOps · Java · Docker

---

Neste artigo mostro como empacotar uma aplicação **Spring Boot** usando **Docker**, e como integrar isso num pipeline de CI/CD.

## 🧱 Estrutura básica

O projeto contém:
- `Dockerfile`
- `docker-compose.yml` (para desenvolvimento)
- Workflow do GitHub Actions para CI

### Exemplo de `Dockerfile`

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
