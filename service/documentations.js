const swaggerDocumation = {
  openapi: "3.0.0",
  info: {
    title: "Swagger Sample App",
    version: "1.0.0",
    description: "This is a sample server",
  },
  servers: [
    {
      url: "http://localhost:5001",
      description: "Local server",
    },
    {
      url: "http://localhost:8081",
      description: "Dev server",
    },
  ],
  tags: [
    {
      name: "User",
      description: "User Routes",
    },
  ],

  path: {
    "/api/user/get/:id": {
      get: {
        tags: ["User"],
        description: "Get user",
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    user: [],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocumation;
