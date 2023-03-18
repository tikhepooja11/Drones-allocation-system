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
const Model = require("../models/drone");
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("../library/logging"));
const auth_1 = require("../middlewares/auth");
const drone_1 = require("../services/drone");
const router = express_1.default.Router();
router.post("/create", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const droneService = new drone_1.DroneService();
    try {
        const { name, droneType, makeName, createdBy, siteId, category } = req.body;
        const user = yield droneService.createDrone({
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
    }
    catch (error) {
        logging_1.default.error(`Error in creating a new drone`);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/getAll", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Listing all drones");
    const droneService = new drone_1.DroneService();
    try {
        const dronList = yield droneService.listAllDrones();
        if (dronList.length > 0) {
            return response.status(200).send(dronList);
        }
        else {
            return response.status(404).send({ message: "Drones not found" });
        }
    }
    catch (error) {
        response.status(500).send(error).json({ message: "Internal server error" });
    }
}));
// List all Drones by site
router.get("/getDronesBySiteId", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const droneService = new drone_1.DroneService();
    const myFilter = req.body;
    console.log(myFilter);
    try {
        const drones = yield droneService.getDroneBySiteId(myFilter);
        console.log("length", drones === null || drones === void 0 ? void 0 : drones.length);
        if (drones.length > 0) {
            return res.status(200).send(drones);
        }
        else {
            logging_1.default.error(`Drone with this siteId not found`);
            return res
                .status(404)
                .json({ message: "Drone with this siteId not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// List all Drones by category
router.get("/getDronesByCategory", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const droneService = new drone_1.DroneService();
    const myFilter = req.body;
    console.log(myFilter);
    try {
        const drones = yield droneService.getDroneByCategoryId(myFilter);
        if (drones.length > 0) {
            return res.status(200).send(drones);
        }
        else {
            logging_1.default.error(`Drone with this categoryId not found`);
            return res
                .status(404)
                .json({ message: "Drone with this categoryId not found" });
        }
    }
    catch (error) {
        logging_1.default.error(`Interval server error`);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/getDroneById/:id", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Fetching drone with id");
    const droneService = new drone_1.DroneService();
    const droneId = request.params.id;
    try {
        const drone = yield droneService.getDroneById(droneId);
        if (!drone) {
            return response.status(404).json({ message: "Drone with id not found" });
        }
        return response.status(200).send(drone);
    }
    catch (error) {
        logging_1.default.error(`Internal Server Error`);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}));
// Delete Drone
router.delete("/delete/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Deleting drone");
    const droneId = req.params.id;
    const droneService = new drone_1.DroneService();
    try {
        const deletedDrone = yield droneService.deleteDrone(droneId);
        if (!deletedDrone) {
            return res.status(404).json({ message: "Drone with id not found" });
        }
        return res.status(200).send(deletedDrone);
    }
    catch (error) {
        logging_1.default.error(`Internal Server Error`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.patch("/update/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Updating drone details");
    const droneId = req.params.id;
    const updateInput = {
        droneType: req.body.droneType,
        makeName: req.body.makeName,
        name: req.body.name,
        siteId: req.body.siteId,
        category: req.body.category,
        updatedAt: Date.now(),
    };
    const droneService = new drone_1.DroneService();
    try {
        const updatedDrone = yield droneService.updateDroneDetails(droneId, updateInput);
        if (!updatedDrone) {
            return res.status(404).json({ message: "Drone with id not found" });
        }
        return res.status(200).send(updatedDrone);
    }
    catch (error) {
        logging_1.default.error(`Internal Server Error`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
module.exports = router;
