export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Posts API",
            version: "1.0.0",
            description: "A simple API"
        },
        tags: [
            {
                name: "Users",
                description: "API for users in the system"
            },
            {
                name: "Posts",
                description: "API in post the system"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ["./docs/**/*.yaml"]
};
