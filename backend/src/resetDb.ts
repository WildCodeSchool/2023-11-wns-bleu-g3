import db from "./db";
import User, { UserRole } from "./entities/User";
import ActivityType, { Category, Unit } from "./entities/ActivityType";
import {
  FuelType,
  VehicleDecade,
  VehicleType,
  MotoEngine,
  VehicleCategory,
} from "./entities/Enums/Vehicle_Attributes";
import fs from "fs";
import path from "path";
import PersonalVehicle from "./entities/PersonalVehicle";
import Post from "./entities/Post";
import Donation from "./entities/Donation";

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
      "https://cdn-s-www.estrepublicain.fr/images/829E79B4-6141-4B09-A1A4-C8CA53D382BE/NW_raw/greta-thunberg-a-caen-ce-dimanche-photo-jean-francois-monier-afp-1563726733.jpg",
    createdAt: "2024-01-03T07:19:22.111Z",
    emailVerified: true,
  });
  await user.save();

  const user1 = new User();
  Object.assign(user1, {
    nickname: "MarcLeVert",
    email: "marco1234@app.com",
    password: "Visitor42@!",
    firstName: "Marc",
    lastName: "LeVert",
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Earth_from_Space.jpg/240px-Earth_from_Space.jpg",
    createdAt: "2024-03-12T07:19:22.111Z",
    emailVerified: true,
  });
  await user1.save();

  const user2 = new User();
  Object.assign(user2, {
    nickname: "LilaFleurie",
    email: "lilafleurie@app.com",
    password: "Visitor42@!",
    avatarUrl: "https://m.media-amazon.com/images/I/61RlSyFFobL._AC_SX522_.jpg",
    createdAt: "2024-04-20T07:19:22.111Z",
    emailVerified: true,
  });
  await user2.save();

  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87FpEHh7b1IAE-l9u-QyhqzZdT6b3Kr8HSQ&s",
  });
  await admin.save();

  const user3 = new User();
  Object.assign(user3, {
    nickname: "ClaireNature",
    email: "claire5678@app.com",
    password: "Visitor42@!",
    firstName: "Claire",
    lastName: "Nature",
    avatarUrl: "https://randomuser.me/api/portraits/women/72.jpg",
    createdAt: "2024-03-12T08:22:35.222Z",
    emailVerified: true,
  });
  await user3.save();

  const user4 = new User();
  Object.assign(user4, {
    nickname: "JulienEco",
    email: "julien9012@app.com",
    password: "Visitor42@!",
    firstName: "Julien",
    lastName: "Eco",
    avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    createdAt: "2024-03-12T09:35:45.333Z",
    emailVerified: true,
  });
  await user4.save();

  const user5 = new User();
  Object.assign(user5, {
    nickname: "SophieGreen",
    email: "sophie3456@app.com",
    password: "Visitor42@!",
    firstName: "Sophie",
    lastName: "Green",
    avatarUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    createdAt: "2024-03-12T10:48:55.444Z",
    emailVerified: true,
  });
  await user5.save();

  const user6 = new User();
  Object.assign(user6, {
    nickname: "LucasTerre",
    email: "lucas7890@app.com",
    password: "Visitor42@!",
    firstName: "Lucas",
    lastName: "West",
    avatarUrl: "https://media1.tenor.com/m/UKIJv9wAbbIAAAAC/meme-mood.gif",
    createdAt: "2024-03-12T11:51:05.555Z",
    emailVerified: true,
  });
  await user6.save();

  const user7 = new User();
  Object.assign(user7, {
    nickname: "ElodieFaune",
    email: "elodie4321@app.com",
    password: "Visitor42@!",
    firstName: "Elodie",
    lastName: "Faune",
    avatarUrl: "https://randomuser.me/api/portraits/women/17.jpg",
    createdAt: "2024-03-12T12:54:15.666Z",
    emailVerified: true,
  });
  await user7.save();

  const personalVehicle1 = new PersonalVehicle();
  Object.assign(personalVehicle1, {
    name: "Mon super vélo",
    vehicle_category: VehicleCategory.Bike,
    emissionByKm: 13,
    user: user,
  });
  await personalVehicle1.save();

  const personalVehicle2 = new PersonalVehicle();
  Object.assign(personalVehicle2, {
    name: "Porsche Cayenne",
    vehicle_category: VehicleCategory.Car,
    fuel_type: FuelType.Petrol,
    vehicle_type: VehicleType.Luxury,
    year_of_construction: VehicleDecade.Decade2020s,
    emissionByKm: 104,
    user: user,
  });
  await personalVehicle2.save();

  const personalVehicle3 = new PersonalVehicle();
  Object.assign(personalVehicle3, {
    name: "Ma moto",
    vehicle_category: VehicleCategory.Moto,
    moto_engine: MotoEngine.Engine500plus,
    emissionByKm: 132,
    user: user,
  });
  await personalVehicle3.save();

  const post1 = new Post();
  Object.assign(post1, {
    title: "Limiter sa consommation d’électricité",
    content:
      "Chaque appareil électroménager à la vente affiche désormais une étiquette avec un diagnostic de sa consommation, classée de A +++ à D. Un appareil de classe A +++ consomme de 20 % à 50 % d’énergie en moins qu’un autre de classe A +.\nSelon l’Agence de l’environnement et de la maîtrise de l’énergie (Ademe), si tous les ménages français choisissaient les appareils les plus économes en s’équipant, on économiserait 4,9 TWh/an, soit la consommation d’électricité domestique de 2 millions de personnes.\nPréférez des ampoules LED, qui présentent de multiples avantages : lumineuses immédiatement, peu consommatrices d’énergies, d’une longue durée de vie et dégageant peu de chaleur.",
    user: user,
  });
  await post1.save();

  const post2 = new Post();
  Object.assign(post2, {
    title:
      "Alimentation : moins de viande, plus de légumes locaux et de saison",
    content:
      "La viande rouge est plus émettrice que la viande blanche (volaille) du fait de la taille des animaux, qui nécessitent davantage d’alimentation et d’espace pour l’élevage.\nUne manière de diminuer son empreinte carbone est de réduire la consommation de viande (notamment rouge) et de veiller, si possible, à manger local.\nMais cela ne fait pas tout : il faut également veiller à consommer au maximum des produits de saison. Dans le cas contraire, ces fruits et légumes sont cultivés sous serres chauffées ou importées, en avion ou en bateau, et ont un bilan carbone beaucoup plus conséquent.\nEn décembre, oubliez les tomates et les framboises !",
    imageUrl:
      "https://webzine.voyage/wp-content/uploads/fruits-legumes-saison.jpg",
    user: user2,
  });
  await post2.save();

  const post3 = new Post();
  Object.assign(post3, {
    title: "Réduire sa consommation d’eau",
    content:
      "Installez un mousseur, également appelé « brise-jet », sur vos robinets (hors baignoire), qui réduit le volume d’eau tout en en conservant la pression. Simple d’installation et peu cher (moins de 15 euros), il peut faire économiser plus de 50 % de votre consommation d’eau sur vos robinets.\nPour les plus téméraires (de préférence habitant en maison), vous pouvez installer des toilettes sèches, où la « production » est recouverte de sciure ou de copeaux de bois – qui empêchent par ailleurs les mauvaises odeurs – pour ensuite l’utiliser pour en faire du compost ou de la biométhanisation (production de chaleur ou d’électricité).",
    user: user1,
  });
  await post3.save();

  const post4 = new Post();
  Object.assign(post4, {
    title: "Plus de transports en commun ou de vélo",
    content:
      "Les transports constituent la première source d’émissions de gaz à effet de serre en France (27,8 % des émissions totales du pays en 2012). La quasi-totalité (92 %) provient du transport routier.\nLes voitures hybrides ne représentent encore que 2 % du parc automibile, mais l’offre se développe. Mêlant moteur électrique pour les vitesses faibles et moteur thermique pour les plus élevées, elles permettent à la fois de faire des économies en carburant et de rejeter moins de gaz à effet de serre.\nLes véhicules électriques sont plus confidentiels encore mais sont, de loin, les moins polluants. Avant, peut-être, l’essor de la voiture à hydrogène.\nPour les trajets urbains, essayez de privilégier les transports en commun ou les voitures en autopartage, en plein développement. Le mieux, en termes d’émissions de gaz à effet de serre, étant bien sûr la marche ou le vélo, d’autant plus avec le développement des voies cyclables (bien que la France soit encore à la traîne en Europe) et des systèmes de vélos en libre-service.",
    imageUrl:
      "https://s3.pub1.infomaniak.cloud/object/v1/AUTH_c42f0b398b014edbad1011f531a5bda8/lekaba-cms-uploads/Infographieveloelectrique_45e8d089ba.png",
    user: user2,
  });
  await post4.save();

  const post5 = new Post();
  Object.assign(post5, {
    title: "Essayer de tendre vers le zéro déchet",
    content:
      "Arriver au zéro déchet, un objectif ambitieux mais pas impossible à atteindre... Pour y arriver, nous vous recommandons de vous fixer des objectifs atteignables :\n- évitez les produits trop emballés : repérez le magasin de vente en vrac le plus proche de chez vous pour vos achats ;\n- préférez les produits réutilisables aux produits jetables : essayez les couches lavables pour vos enfants, prévoyez couverts et verres lavables pour vos pique-niques et vos réceptions, pensez à avoir en permanence un cabas pour faire vos courses, apportez une gourde recyclable au bureau ;\n- vous vous sentez l'âme d'un apprenti chimiste ? Lancez-vous dans la conception de produits d'entretien, voire de crèmes cosmétiques en suivant attentivement les recettes proposées sur la toile ;\n- réutilisez, transformez, améliorez : conservez par exemple les boîtes d'emballages de vos produits pour y mettre vos bijoux, vos accessoires, les jeux de vos enfants etc.",
    imageUrl:
      "https://www.1jour1actu.com/wp-content/uploads/2019/04/01-zeroDechet-copie.jpg",
    user: user,
  });
  await post5.save();

  const donation1 = new Donation();
  Object.assign(donation1, {
    amount: 125,
    user: user,
    dateOfDonation: "2024-03-12T07:19:22.111Z",
  });
  await donation1.save();

  const donation2 = new Donation();
  Object.assign(donation2, {
    amount: 120,
    user: user1,
    dateOfDonation: "2024-07-02T07:19:22.111Z",
  });
  await donation2.save();

  const donation3 = new Donation();
  Object.assign(donation3, {
    amount: 170,
    user: user5,
    dateOfDonation: "2024-11-20T07:19:22.111Z",
  });
  await donation3.save();

  const donation4 = new Donation();
  Object.assign(donation4, {
    amount: 100,
    user: user7,
    dateOfDonation: "2024-02-25T07:19:22.111Z",
  });
  await donation4.save();

  const donation5 = new Donation();
  Object.assign(donation5, {
    amount: 100,
    user: user3,
    dateOfDonation: "2024-01-02T07:19:22.111Z",
  });
  await donation5.save();

  const donation6 = new Donation();
  Object.assign(donation6, {
    amount: 300,
    user: user6,
    dateOfDonation: "2024-06-28T07:19:22.111Z",
  });
  await donation6.save();

  const donation7 = new Donation();
  Object.assign(donation7, {
    amount: 100,
    user: user2,
    dateOfDonation: "2024-09-02T07:19:22.111Z",
  });
  await donation7.save();

  // Json Reader
  const filePath = path.resolve(__dirname, "../src/data/defaultDB.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const activityTypes = JSON.parse(data);

  for (const data of activityTypes) {
    const Activity = new ActivityType();
    Object.assign(Activity, {
      name: data.name,
      category: Category[data.category as keyof typeof Category],
      unit: Unit[data.unit as keyof typeof Unit],
      emissions: data.emissions,
      vehicleAttributes: data.vehicleAttributes
        ? {
            fuelType:
              FuelType[
                data.vehicleAttributes.fuelType as keyof typeof FuelType
              ] ?? null,
            vehicleType:
              VehicleType[
                data.vehicleAttributes.vehicleType as keyof typeof VehicleType
              ] ?? null,
            vehicleDecade:
              VehicleDecade[
                data.vehicleAttributes
                  .vehicleDecade as keyof typeof VehicleDecade
              ] ?? null,
            motoEngine:
              MotoEngine[
                data.vehicleAttributes.motoEngine as keyof typeof MotoEngine
              ] ?? null,
          }
        : null,
    });
    await Activity.save();
  }

  await db.destroy();
  console.log("done !");
}

main();
