import { registerEnumType } from "type-graphql";

export enum VehicleCategory {
  Car = "Voiture",
  Moto = "Moto",
  Bike = "Vélo électrique",
}

// Car
export enum FuelType {
  Petrol = "Essence",
  Diesel = "Diesel",
  Hybrid = "Hybride",
  Electric = "Électrique",
  Hydrogen = "Hydrogène",
}

export const fuelTypeCalc: { [key in FuelType]: number } = {
  [FuelType.Petrol]: 1.06,
  [FuelType.Diesel]: 1.0,
  [FuelType.Hybrid]: 0.85,
  [FuelType.Electric]: 0.78,
  [FuelType.Hydrogen]: 0.3,
};

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

//this function calculates the vehicleDecade enum based on the year selected by the user
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
