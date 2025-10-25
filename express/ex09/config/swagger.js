const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuários",
      version: "1.0.0",
      description: "Documentação da API criada para fins de aprendizado",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"], // Aqui o Swagger vai buscar os comentários das rotas
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Documentação disponível em http://localhost:8000/api-docs");
}

module.exports = swaggerDocs;
