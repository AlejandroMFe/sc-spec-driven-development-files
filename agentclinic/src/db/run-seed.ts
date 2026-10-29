import { createDb } from "./index.js";
import { migrate } from "./migrate.js";
import { seed } from "./seed.js";

const db = createDb();
migrate(db);
seed(db);
console.log("Database seeded.");
