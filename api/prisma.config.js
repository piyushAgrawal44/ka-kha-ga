import { defineConfig } from "prisma/config";
export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    engine: "classic",
    datasource: {
        url: "mysql://root:@localhost:3306/ka_kha_ga",
    },
});
//# sourceMappingURL=prisma.config.js.map