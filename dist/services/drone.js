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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneService = void 0;
const drone_repository_1 = require("../repository/drone-repository");
// All Business logic will be here
class DroneService {
    constructor() {
        this.createDrone = (drone) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside registerUser() method");
            const result = yield this.repository.createDrone(drone);
            return result;
        });
        this.getDroneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const drone = yield this.repository.findById(id);
            return drone;
        });
        this.getDroneByCategoryId = (myFilter) => __awaiter(this, void 0, void 0, function* () {
            const droneLists = yield this.repository.getDroneByCategoryId(myFilter);
            return droneLists;
        });
        this.getDroneBySiteId = (myFilter) => __awaiter(this, void 0, void 0, function* () {
            const droneLists = yield this.repository.getDroneBySiteId(myFilter);
            return droneLists;
        });
        this.listAllDrones = () => __awaiter(this, void 0, void 0, function* () {
            const dronesList = yield this.repository.listAllDrones();
            return dronesList;
        });
        this.updateDroneDetails = (droneId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const droneDetails = yield this.repository.updateDroneDetails(droneId, updateInput);
            return droneDetails;
        });
        this.deleteDrone = (droneId) => __awaiter(this, void 0, void 0, function* () {
            const dronesList = yield this.repository.deleteDrone(droneId);
            return dronesList;
        });
        this.repository = new drone_repository_1.DroneRepository();
    }
}
exports.DroneService = DroneService;
