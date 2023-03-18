"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("../library/logging"));
const auth_1 = require("../middlewares/auth");
const mission_1 = require("../services/mission");
const router = express_1.default.Router();
// Create Drone
router.post("/create", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //tokenVerifiy
    const missionService = new mission_1.MissionService();
    try {
        const { alt, speed, name, waypoints, siteId, category, createdBy } = req.body;
        const user = yield missionService.createMission({
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
    }
    catch (error) {
        logging_1.default.error(`Error in creating a new mission`);
        return res.status(404).json({ message: "Internal server error" });
    }
}));
// list all missions
router.get("/listAll", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Listing all drones");
    const missionService = new mission_1.MissionService();
    try {
        const missionList = yield missionService.listAllMissions();
        if (missionList.length > 0) {
            return response.status(200).send(missionList);
        }
        else {
            return response.status(404).send({ message: "Missions are not found" });
        }
    }
    catch (error) {
        response.status(500).send(error).json({ message: "Internal server error" });
    }
}));
// List all Missions by site
router.get("/getMissionsBySiteId", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const missionService = new mission_1.MissionService();
    const myFilter = req.body;
    console.log(myFilter);
    try {
        const missions = yield missionService.getMissionsBySiteId(myFilter);
        console.log("length", missions === null || missions === void 0 ? void 0 : missions.length);
        if ((missions === null || missions === void 0 ? void 0 : missions.length) > 0) {
            return res.status(200).send(missions);
        }
        else {
            logging_1.default.error(`missions with this siteId not found`);
            return res
                .status(404)
                .json({ message: "missions with this siteId not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// List all Drones by category
router.get("/getMissionsByCategoryId", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const missionService = new mission_1.MissionService();
    const myFilter = req.body;
    console.log(myFilter);
    try {
        const missions = yield missionService.getMissionsByCategoryId(myFilter);
        console.log("length", missions === null || missions === void 0 ? void 0 : missions.length);
        if ((missions === null || missions === void 0 ? void 0 : missions.length) > 0) {
            return res.status(200).send(missions);
        }
        else {
            logging_1.default.error(`missions with this categoryId not found`);
            return res
                .status(404)
                .json({ message: "missions with this categoryId not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Interval server error`);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/getMissionById/:id", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Fetching drone with id");
    const missionService = new mission_1.MissionService();
    const missionId = request.params.id;
    try {
        const mission = yield missionService.getMissionById(missionId);
        if (!mission) {
            return response
                .status(404)
                .json({ message: "Mission with id not found" });
        }
        return response.status(200).send(mission);
    }
    catch (error) {
        logging_1.default.error(`Internal server error`);
        return response.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/delete/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const missionId = req.params.id;
    const missionService = new mission_1.MissionService();
    try {
        const deletedDrone = yield missionService.deleteMission(missionId);
        if (deletedDrone) {
            return res.status(200).send(deletedDrone);
        }
        else {
            return res.status(404).json({ message: "mission with id not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.patch("/update/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Updating mission details");
    const missionId = req.params.id;
    const updateInput = {
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
    const missionService = new mission_1.MissionService();
    try {
        const updatedMission = yield missionService.updateMissionDetails(missionId, updateInput);
        if (updatedMission) {
            return res.status(200).send(updatedMission);
        }
        else {
            return res.status(404).json({ message: "mission with id not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
module.exports = router;
