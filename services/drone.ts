import { DroneRepository } from "../repository/drone-repository";
import { IDrone } from "../models/drone";
import { Drone, IDroneUpdate } from "../libs/service-types/drone";


// All Business logic will be here
export class DroneService {
  private repository: DroneRepository;
  constructor() {
    this.repository = new DroneRepository();
  }

  createDrone = async (drone: Drone): Promise<IDrone> => {
    console.log("inside registerUser() method");
    const result = await this.repository.createDrone(drone);
    return result;
  };

  getDroneById = async (id: string): Promise<IDrone | null> => {
    const drone = await this.repository.findById(id);
    return drone;
  };

  getDroneByCategoryId = async (
    myFilter: Record<string, unknown>
  ): Promise<IDrone[]> => {
    const droneLists = await this.repository.getDroneByCategoryId(myFilter);
    return droneLists;
  };

  getDroneBySiteId = async (
    myFilter: Record<string, unknown>
  ): Promise<IDrone[]> => {
    const droneLists = await this.repository.getDroneBySiteId(myFilter);
    return droneLists;
  };

  listAllDrones = async (): Promise<IDrone[]> => {
    const dronesList = await this.repository.listAllDrones();
    return dronesList;
  };

  updateDroneDetails = async (
    droneId: string,
    updateInput: IDroneUpdate
  ): Promise<IDrone | null> => {
    const droneDetails = await this.repository.updateDroneDetails(
      droneId,
      updateInput
    );
    return droneDetails;
  };

  deleteDrone = async (droneId: string): Promise<IDrone | null> => {
    const dronesList = await this.repository.deleteDrone(droneId);
    return dronesList;
  };
}
