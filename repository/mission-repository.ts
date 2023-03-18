import MissionModel, { IMission } from "../models/mission";
import { Mission, IMissionUpdate } from "../libs/service-types/mission";

export class MissionRepository {
  createMission = async (mission: Mission): Promise<IMission> => {
    console.log("inside createMission reposiroty", mission);
    const missionModel = new MissionModel(mission);
    const result = await missionModel.save();
    console.log("inside mission repository", result);
    return result;
  };

  findById = async (id: string): Promise<IMission | null> => {
    const result = await MissionModel.findById(id)
      .where("deletedAt")
      .equals(null);
    return result;
  };

  listAllMissions = async (): Promise<IMission[]> => {
    const result = await MissionModel.find();
    return result;
  };

  getMissionsByCategoryId = async (
    myfilter: Record<string, unknown>
  ): Promise<IMission[]> => {
    const result = await MissionModel.find(myfilter);
    console.log("inside repo", result);
    return result;
  };

  getMissionsBySiteId = async (
    myfilter: Record<string, unknown>
  ): Promise<IMission[]> => {
    const result = await MissionModel.find(myfilter);
    console.log("inside repo", result);
    return result;
  };

  updateMissionDetails = async (
    missionId: string,
    updateInput: IMissionUpdate
  ): Promise<IMission | null> => {
    console.log("missionId", missionId);
    console.log("missionUpdate", updateInput);
    const options = { new: true };
    const result = await MissionModel.findByIdAndUpdate(
      missionId,
      updateInput,
      options
    );
    return result;
  };

  deleteMission = async (missionId: string): Promise<IMission | null> => {
    console.log("inside mission repository", missionId);
    const result = await MissionModel.findByIdAndDelete(missionId);
    console.log("result", result);
    return result;
  };
}
