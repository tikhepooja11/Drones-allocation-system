import express from "express";
import Logging from "../loggers/logging";
import { IDroneUpdate } from "../libs/service-types/drone";
import { tokenVerifiy } from "../middlewares/auth";
import { DroneService } from "../services/drone";

const router = express.Router();
router.post("/create", tokenVerifiy, async (req, res) => {
  const droneService = new DroneService();
  try {
    const { name, droneType, makeName, createdBy, siteId, category } = req.body;
    const user = await droneService.createDrone({
      name,
      droneType,
      makeName,
      createdBy,
      siteId,
      category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return res.status(201).json(user);
  } catch (error) {
    Logging.error(`Error in creating a new drone`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getAll", tokenVerifiy, async (request, response) => {
  Logging.info("Listing all drones");
  const droneService = new DroneService();
  try {
    const dronList = await droneService.listAllDrones();
    if (dronList.length > 0) {
      return response.status(200).send(dronList);
    } else {
      return response.status(404).send({ message: "Drones not found" });
    }
  } catch (error) {
    response.status(500).send(error).json({ message: "Internal server error" });
  }
});

// List all Drones by site
router.get("/getDronesBySiteId", tokenVerifiy, async (req, res) => {
  const droneService = new DroneService();
  const myFilter = req.body as Record<string, unknown>;
  console.log(myFilter);

  try {
    const drones = await droneService.getDroneBySiteId(myFilter);
    console.log("length", drones?.length);
    if (drones.length > 0) {
      return res.status(200).send(drones);
    } else {
      Logging.error(`Drone with this siteId not found`);
      return res
        .status(404)
        .json({ message: "Drone with this siteId not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// List all Drones by category
router.get("/getDronesByCategory", tokenVerifiy, async (req, res) => {
  const droneService = new DroneService();
  const myFilter = req.body as Record<string, unknown>;
  console.log(myFilter);

  try {
    const drones = await droneService.getDroneByCategoryId(myFilter);
    if (drones.length > 0) {
      return res.status(200).send(drones);
    } else {
      Logging.error(`Drone with this categoryId not found`);
      return res
        .status(404)
        .json({ message: "Drone with this categoryId not found" });
    }
  } catch (error) {
    Logging.error(`Interval server error`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getDroneById/:id", tokenVerifiy, async (request, response) => {
  Logging.info("Fetching drone with id");
  const droneService = new DroneService();
  const droneId = request.params.id;
  try {
    const drone = await droneService.getDroneById(droneId);
    if (!drone) {
      return response.status(404).json({ message: "Drone with id not found" });
    }
    return response.status(200).send(drone);
  } catch (error) {
    Logging.error(`Internal Server Error`);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Deleting drone");
  const droneId = req.params.id;
  const droneService = new DroneService();
  try {
    const deletedDrone = await droneService.deleteDrone(droneId);
    if (!deletedDrone) {
      return res.status(404).json({ message: "Drone with id not found" });
    }
    return res.status(200).send(deletedDrone);
  } catch (error) {
    Logging.error(`Internal Server Error`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/update/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Updating drone details");
  const droneId = req.params.id;
  const updateInput: IDroneUpdate = {
    droneType: req.body.droneType,
    makeName: req.body.makeName,
    name: req.body.name,
    siteId: req.body.siteId,
    category: req.body.category,
    updatedAt: Date.now(),
  };
  const droneService = new DroneService();
  try {
    const updatedDrone = await droneService.updateDroneDetails(
      droneId,
      updateInput
    );
    if (!updatedDrone) {
      return res.status(404).json({ message: "Drone with id not found" });
    }
    return res.status(200).send(updatedDrone);
  } catch (error) {
    Logging.error(`Internal Server Error`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export = router;
