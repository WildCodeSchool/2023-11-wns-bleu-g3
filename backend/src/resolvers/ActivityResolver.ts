import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import Activity, {
  ActivityCategory,
  ReccurenceInterval,
  UpdateActivityInput,
} from "../entities/Activity";
import { NewActivityInput } from "../entities/Activity";
import { Context } from "../types";
import { GraphQLError } from "graphql";
import ActivityType, { Category } from "../entities/ActivityType";
import PersonalVehicle from "../entities/PersonalVehicle";
import { FuelType, MotoEngine } from "../entities/Enums/Vehicle_Attributes";
import { Between, ILike } from "typeorm";

enum SortingOrder {
  ASC = "ASC",
  DESC = "DESC",
}

enum ActivityOrderBy {
  NAME = "name",
  CATEGORY = "category",
  STARTSAT = "starts_at",
  EMISSIONPERMONTH = "emissionPerMonth",
}

@Resolver(Activity)
class ActivityResolver {
  //QUERIES
  @Authorized()
  @Query(() => [Activity])
  async getActivities(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<Activity[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== "admin") {
      throw new GraphQLError("You do not have permission.");
    }

    const activities = await Activity.find({
      relations: { user: true },
      where: { user: { id: userIdToFetch } },
    });
    return activities;
  }

  @Authorized()
  @Query(() => [Activity])
  async getGraphActivities(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<Activity[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const currentDate = new Date();
    const firstDayToDisplay = new Date();
    firstDayToDisplay.setFullYear(currentDate.getFullYear() - 1);

    const activities = await Activity.find({
      relations: { user: true },
      where: {
        user: { id: userIdToFetch },
        starts_at: Between(firstDayToDisplay, currentDate),
      },
    });

    return activities;
  }

  @Authorized()
  @Query(() => [Activity])
  async getUserActivities(
    @Ctx() ctx: Context,
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 9 }) limit: number,
    @Arg("orderBy", { nullable: true, defaultValue: 9 })
    orderBy: ActivityOrderBy,
    @Arg("orderDir", { nullable: true }) orderDir: SortingOrder,
    @Arg("userId", { nullable: true }) userId?: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("category", () => String, { nullable: true })
    category?: ActivityCategory
  ): Promise<Activity[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== "admin") {
      throw new GraphQLError("You do not have permission.");
    }

    const activities = await Activity.find({
      order: { [orderBy]: orderDir },
      skip: offset,
      take: limit,
      relations: { user: true },
      where: {
        user: { id: userIdToFetch },
        name: name ? ILike(`%${name}%`) : undefined,
        category: category ? category : undefined,
      },
    });
    return activities;
  }

  //MUTATIONS
  @Authorized()
  @Mutation(() => Number)
  async createActivity(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: NewActivityInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    let numberOfMonths = 1;
    let totalEmission = 0;
    if (data.ends_at) {
      let DifferenceInTime = data.ends_at.getTime() - data.starts_at.getTime();
      let DifferenceInDays = Math.round(DifferenceInTime / (1000 * 3600 * 24));
      numberOfMonths = Math.round(DifferenceInDays / 30);
    }

    const activityType = await ActivityType.findOne({
      where: { name: data.type },
    });

    if (activityType?.category === Category.Heating) {
      numberOfMonths = 12;
    }
    if (numberOfMonths === 0 || numberOfMonths === -0) {
      numberOfMonths = 1;
    }
    for (let i = 0; i < numberOfMonths; i++) {
      const newActivity = new Activity();
      Object.assign(newActivity, data);
      newActivity.user = ctx.currentUser;

      if (activityType) {
        newActivity.emissionPerMonth =
          (newActivity.quantity || 1) * activityType.emissions;
        if (activityType.category === Category.Clothing) {
          newActivity.category = ActivityCategory.Clothing;
          if (newActivity.is_secondhand) {
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth * 0.16
            );
          }
          if (newActivity.is_made_in_france) {
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth * 0.5
            );
          }
        }
        if (activityType.category === Category.Electronics) {
          newActivity.category = ActivityCategory.Electronics;
          if (newActivity.is_secondhand) {
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth * 0.13
            );
          }
              }
        if (activityType.category === Category.Heating) {
          newActivity.category = ActivityCategory.Heating;
          newActivity.emissionPerMonth = Math.round(
            newActivity.emissionPerMonth / 12
          );
        }
      }
      if (!activityType) {
        const vehicle = await PersonalVehicle.findOne({
          where: { name: data.type },
        });
        newActivity.emissionPerMonth = vehicle?.emissionByKm
          ? vehicle?.emissionByKm * newActivity.quantity
          : newActivity.quantity;
        if (vehicle) {
          newActivity.category = ActivityCategory.Shifting;
        } else {
          if (data.type === Category.Plane) {
            const planes = await ActivityType.find({
              where: { category: Category.Plane },
            });
            if (planes.length > 0) {
              planes.forEach((plane) => {
                let planeKilometers = plane.name.match(/\d+/g);
                if (planeKilometers !== null) {
                  const newTab = planeKilometers
                    .map((km) => parseInt(km))
                    .sort((a, b) => a - b);
                  if (
                    newActivity.quantity > newTab[0] &&
                    newActivity.quantity < newTab[1]
                  ) {
                    newActivity.category = ActivityCategory.Shifting;
                    newActivity.emissionPerMonth =
                      plane.emissions * newActivity.quantity;
                  }
                }
              });
            }
          } else if (data.type === Category.Boat) {
            const boat = await ActivityType.findOne({
              where: { category: Category.Boat },
            });
            if (boat) {
              newActivity.category = ActivityCategory.Shifting;
              newActivity.emissionPerMonth =
                boat.emissions * newActivity.quantity;
            }
          } else if (
            data.type === MotoEngine.Engine125orless ||
            data.type === MotoEngine.Engine125to500 ||
            data.type === MotoEngine.Engine500plus
          ) {
            const moto = await ActivityType.findOne({
              where: {
                category: Category.Moto,
                vehicleAttributes: { motoEngine: data.type as MotoEngine },
              },
            });
            if (moto) {
              newActivity.category = ActivityCategory.Shifting;
              newActivity.emissionPerMonth =
                moto.emissions * newActivity.quantity;
            }
          } else if (
            data.type === FuelType.Diesel ||
            data.type === FuelType.Electric ||
            data.type === FuelType.Petrol
          ) {
            const car = await ActivityType.findOne({
              where: {
                category: Category.Car,
                vehicleAttributes: { fuelType: data.type as FuelType },
                name: ILike(`%Moyenne%`),
              },
            });
            if (car) {
              newActivity.category = ActivityCategory.Shifting;
              newActivity.emissionPerMonth =
                car.emissions * newActivity.quantity;
            }
          } else {
            newActivity.category = ActivityCategory.Other;
          }
        }
      }
      if (newActivity.is_reccurent) {
        switch (newActivity.reccurence_interval) {
          case ReccurenceInterval.Day:
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth *
                (newActivity.reccurence_count || 1) *
                30
            );
            break;
          case ReccurenceInterval.Week:
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth *
                (newActivity.reccurence_count || 1) *
                4
            );
            break;
          case ReccurenceInterval.Month:
            newActivity.emissionPerMonth = Math.round(
              newActivity.emissionPerMonth * (newActivity.reccurence_count || 1)
            );
            break;
          case ReccurenceInterval.Trimester:
            newActivity.emissionPerMonth = Math.round(
              (newActivity.emissionPerMonth *
                (newActivity.reccurence_count || 1)) /
                3
            );
            break;
          case ReccurenceInterval.Year:
            newActivity.emissionPerMonth = Math.round(
              (newActivity.emissionPerMonth *
                (newActivity.reccurence_count || 1)) /
                12
            );
            break;
        }
      }
      const month = newActivity.starts_at.getMonth();
      newActivity.starts_at.setMonth(i === 0 ? month : month + 1);
      await newActivity.save();
      totalEmission = totalEmission + newActivity.emissionPerMonth;
    }
    return totalEmission;
  }

  @Authorized()
  @Mutation(() => Activity)
  async updateActivity(
    @Ctx() ctx: Context,
    @Arg("ActivityId") id: number,
    @Arg("data", { validate: true }) data: UpdateActivityInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const activityToUpdate = await Activity.findOneBy({ id });
    if (!activityToUpdate) throw new GraphQLError("Activity not found.");
    Object.assign(activityToUpdate, data);

    return await activityToUpdate.save();
  }

  @Authorized()
  @Mutation(() => String)
  async deleteActivity(@Ctx() ctx: Context, @Arg("ActivityId") id: number) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const activityToDelete = await Activity.findOneBy({ id });
    if (!activityToDelete) throw new GraphQLError("Activity not found.");
    await activityToDelete.remove();
    return "Activity successfully deleted.";
  }
}

export default ActivityResolver;
