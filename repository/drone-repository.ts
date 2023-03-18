import Logging from "../loggers/logging";
import DroneModel, { IDrone } from "../models/drone";
import { Drone, IDroneUpdate } from "../libs/service-types/drone";

export class DroneRepository {
  createDrone = async (drone: Drone): Promise<IDrone> => {
    Logging.info("inside reposiroty");
    const droneModel = new DroneModel(drone);
    console.log(droneModel);
    const result = await droneModel.save();
    console.log("inside drone repository", result);
    return result;
  };

  findById = async (id: string): Promise<IDrone | null> => {
    const result = await DroneModel.findById(id)
      .where("deletedAt")
      .equals(null);
    return result;
  };

  getDroneByCategoryId = async (
    myfilter: Record<string, unknown>
  ): Promise<IDrone[]> => {
    const result = await DroneModel.find(myfilter);
    console.log("inside repo", result);
    return result;
  };

  getDroneBySiteId = async (
    myfilter: Record<string, unknown>
  ): Promise<IDrone[]> => {
    const result = await DroneModel.find(myfilter);
    console.log("inside repo", result);
    return result;
  };

  listAllDrones = async (): Promise<IDrone[]> => {
    const result = await DroneModel.find();
    return result;
  };

  updateDroneDetails = async (
    droneId: string,
    updateInput: IDroneUpdate
  ): Promise<IDrone | null> => {
    const options = { new: true };
    const result = await DroneModel.findByIdAndUpdate(
      droneId,
      updateInput,
      options
    );
    return result;
  };

  deleteDrone = async (droneId: string): Promise<IDrone | null> => {
    console.log("inside drone repository", droneId);
    const result = await DroneModel.findByIdAndDelete(droneId);
    console.log("result", result);
    return result;
  };
}
