import { Latitude } from "graphql-scalars/typings/mocks";
import db from "./db";
import User, { UserRole } from "./entities/User";
import ActivityType, { Category, Unit } from "./entities/ActivityType";
import {
  FuelType,
  VehicleDecade,
  VehicleType,
} from "./entities/Enums/Vehicle_Attributes";

export async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
    )
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const user = new User();
  Object.assign(user, {
    nickname: "Gretaaaaa",
    email: "greenGreta@app.com",
    password: "Visitor42@!",
    lastName: "Thunberg",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/193/660/png-clipart-computer-icons-woman-avatar-avatar-girl-black-hair-logo-thumbnail.png",
  });
  await user.save();

  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

  const activType1 = new ActivityType();
  Object.assign(activType1, {
    name: "Chemise",
    category: Category.Clothing,
    unit: Unit.PerUnit,
    emissions: 13200,
    vehicleAttributes: null,
  });
  await activType1.save();

  const activType2 = new ActivityType();
  Object.assign(activType2, {
    name: "Voiture Eco Electrique 2020s",
    category: Category.Car,
    unit: Unit.Distance,
    emissions: 66,
    vehicleAttributes: {
      motoEngine: null,
      fuelType: FuelType.Electric,
      vehicleType: VehicleType.Economic,
      vehicleDecade: VehicleDecade.Decade2020s,
    },
  });
  await activType2.save();


  

  await db.destroy();
  console.log("done !");
}

main();
