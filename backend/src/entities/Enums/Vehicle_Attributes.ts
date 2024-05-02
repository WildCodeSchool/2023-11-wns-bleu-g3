import { registerEnumType } from "type-graphql";

// Car
export enum FuelType {
  Petrol = "Essence",
  Diesel = "Diesel",
  Hybrid = "Hybride",
  Electric = "Électrique",
  Hydrogene = "Hydrogène",
}

export enum VehicleType {
  Economic = "Economique",
  Luxury = "Luxe",
  Sports = "Sportif",
}

export enum VehicleDecade {
  Collection = "Avant 90s",
  Decade1990s = "Avant 2000",
  Decade2000s = "2000s",
  Decade2010s = "2010s",
  Decade2020s = "2020s",
}

registerEnumType(FuelType, {
  name: "FuelType",
});
registerEnumType(VehicleType, {
  name: "VehicleType",
});
registerEnumType(VehicleDecade, {
  name: "VehicleDecade",
});

// Moto Scooter
export enum MotoEngine {
  Engine125orless = "moins de 125cc",
  Engine125to500 = "125cc a 500cc",
  Engine500plus = "Plus de 500cc",
  Electric = "Électrique",
}

registerEnumType(MotoEngine, {
  name: "MotoEngine",
});

//this function calculates the vehhicleDecade enum based on the year selected by the user
export default function calculateDecade(year: number): VehicleDecade {
  if (year < 1990) {
    return VehicleDecade.Collection;
  } else if (year < 2000) {
    return VehicleDecade.Decade1990s;
  } else if (year < 2010) {
    return VehicleDecade.Decade2000s;
  } else if (year < 2020) {
    return VehicleDecade.Decade2010s;
  } else {
    return VehicleDecade.Decade2020s;
  }
}
