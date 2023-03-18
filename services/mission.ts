import { IMission } from "../models/mission";
import { Mission, IMissionUpdate } from "../libs/service-types/mission";
import { MissionRepository } from "../repository/mission-repository";

// All Business logic will be here
export class MissionService {
  private repository: MissionRepository;
  constructor() {
    this.repository = new MissionRepository();
  }

  createMission = async (mission: Mission): Promise<IMission> => {
    console.log("inside createMission() method", mission);
    const result = await this.repository.createMission(mission);
    console.log("inside repo result", result);
    return result;
  };

  getMissionById = async (id: string): Promise<IMission | null> => {
    console.log("missionId", id);
    const mission = await this.repository.findById(id);
    console.log("inside mission repo", mission);
    return mission;
  };

  listAllMissions = async (): Promise<IMission[]> => {
    const missions = await this.repository.listAllMissions();
    return missions;
  };

  getMissionsByCategoryId = async (
    myFilter: Record<string, unknown>
  ): Promise<IMission[]> => {
    const droneLists = await this.repository.getMissionsByCategoryId(myFilter);
    return droneLists;
  };

  getMissionsBySiteId = async (
    myFilter: Record<string, unknown>
  ): Promise<IMission[]> => {
    const droneLists = await this.repository.getMissionsBySiteId(myFilter);
    return droneLists;
  };

  updateMissionDetails = async (
    misionId: string,
    updateInput: IMissionUpdate
  ): Promise<IMission | null> => {
    const missionDetails = await this.repository.updateMissionDetails(
      misionId,
      updateInput
    );
    console.log("inside repo ", missionDetails);
    return missionDetails;
  };

  deleteMission = async (missionId: string): Promise<IMission | null> => {
    const category = await this.repository.deleteMission(missionId);
    return category;
  };
}
