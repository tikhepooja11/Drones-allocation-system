import express from "express";
import Logging from "../loggers/logging";
import { IMissionUpdate } from "../libs/service-types/mission";
import { tokenVerifiy } from "../middlewares/auth";
import { MissionService } from "../services/mission";

const router = express.Router();

router.post("/create", tokenVerifiy, async (req, res) => {
  const missionService = new MissionService();
  try {
    const { alt, speed, name, waypoints, siteId, category, createdBy } =
      req.body;
    const user = await missionService.createMission({
      alt,
      speed,
      waypoints,
      name,
      createdBy,
      siteId,
      category,
      isRunnable: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return res.status(200).json(user);
  } catch (error) {
    Logging.error(`Error in creating a new mission`);
    return res.status(404).json({ message: "Internal server error" });
  }
});

// list all missions
router.get("/listAll", tokenVerifiy, async (request, response) => {
  Logging.info("Listing all drones");
  const missionService = new MissionService();
  try {
    const missionList = await missionService.listAllMissions();
    if (missionList.length > 0) {
      return response.status(200).send(missionList);
    } else {
      return response.status(404).send({ message: "Missions are not found" });
    }
  } catch (error) {
    response.status(500).send(error).json({ message: "Internal server error" });
  }
});

// List all Missions by site
router.get("/getMissionsBySiteId", tokenVerifiy, async (req, res) => {
  const missionService = new MissionService();
  const myFilter = req.body as Record<string, unknown>;
  console.log(myFilter);

  try {
    const missions = await missionService.getMissionsBySiteId(myFilter);
    console.log("length", missions?.length);
    if (missions?.length > 0) {
      return res.status(200).send(missions);
    } else {
      Logging.error(`missions with this siteId not found`);
      return res
        .status(404)
        .json({ message: "missions with this siteId not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// List all Drones by category
router.get("/getMissionsByCategoryId", tokenVerifiy, async (req, res) => {
  const missionService = new MissionService();
  const myFilter = req.body as Record<string, unknown>;
  console.log(myFilter);
  try {
    const missions = await missionService.getMissionsByCategoryId(myFilter);
    console.log("length", missions?.length);
    if (missions?.length > 0) {
      return res.status(200).send(missions);
    } else {
      Logging.error(`missions with this categoryId not found`);
      return res
        .status(404)
        .json({ message: "missions with this categoryId not found" });
    }
  } catch (error) {
    Logging.error(`Interval server error`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getMissionById/:id", tokenVerifiy, async (request, response) => {
  Logging.info("Fetching drone with id");
  const missionService = new MissionService();
  const missionId = request.params.id;
  try {
    const mission = await missionService.getMissionById(missionId);
    if (!mission) {
      return response
        .status(404)
        .json({ message: "Mission with id not found" });
    }
    return response.status(200).send(mission);
  } catch (error) {
    Logging.error(`Internal server error`);
    return response.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:id", tokenVerifiy, async (req, res) => {
  const missionId = req.params.id;
  const missionService = new MissionService();
  try {
    const deletedDrone = await missionService.deleteMission(missionId);
    if (deletedDrone) {
      return res.status(200).send(deletedDrone);
    } else {
      return res.status(404).json({ message: "mission with id not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/update/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Updating mission details");
  const missionId = req.params.id;
  const updateInput: IMissionUpdate = {
    alt: req.body.alt,
    speed: req.body.speed,
    name: req.body.name,
    waypoints: req.body.waypoints,
    siteId: req.body.siteId,
    category: req.body.category,
    createdBy: req.body.createdBy,
    isRunnable: false,
    updatedAt: Date.now(),
  };
  const missionService = new MissionService();
  try {
    const updatedMission = await missionService.updateMissionDetails(
      missionId,
      updateInput
    );
    if (updatedMission) {
      return res.status(200).send(updatedMission);
    } else {
      return res.status(404).json({ message: "mission with id not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export = router;

module.exports = router;
