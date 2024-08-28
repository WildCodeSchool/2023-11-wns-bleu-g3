import { DataSource } from "typeorm";
import env from "./env";
import User from "./entities/User";
import ActivityType from "./entities/ActivityType";
import Activity from "./entities/Activity";
import { Follow } from "./entities/Follow";
import PersonalVehicle from "./entities/PersonalVehicle";
import Post from "./entities/Post";
import Like from "./entities/Like";
import Donation from "./entities/Donation";

const db = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [
    User,
    ActivityType,
    Activity,
    Follow,
    PersonalVehicle,
    Post,
    Like,
    Donation,
  ],
  synchronize: true,
  logging: env.NODE_ENV === "test",
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
