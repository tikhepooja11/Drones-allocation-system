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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneRepository = void 0;
const logging_1 = __importDefault(require("../library/logging"));
const drone_1 = __importDefault(require("../models/drone"));
//Dealing with data base operations
class DroneRepository {
    constructor() {
        this.createDrone = (drone) => __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info("inside reposiroty");
            const droneModel = new drone_1.default(drone);
            console.log(droneModel);
            const result = yield droneModel.save();
            console.log("inside drone repository", result);
            return result;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield drone_1.default.findById(id)
                .where("deletedAt")
                .equals(null);
            return result;
        });
        this.getDroneByCategoryId = (myfilter) => __awaiter(this, void 0, void 0, function* () {
            const result = yield drone_1.default.find(myfilter);
            console.log("inside repo", result);
            return result;
        });
        this.getDroneBySiteId = (myfilter) => __awaiter(this, void 0, void 0, function* () {
            const result = yield drone_1.default.find(myfilter);
            console.log("inside repo", result);
            return result;
        });
        this.listAllDrones = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield drone_1.default.find();
            return result;
        });
        this.updateDroneDetails = (droneId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const options = { new: true };
            const result = yield drone_1.default.findByIdAndUpdate(droneId, updateInput, options);
            return result;
        });
        this.deleteDrone = (droneId) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside drone repository", droneId);
            const result = yield drone_1.default.findByIdAndDelete(droneId);
            console.log("result", result);
            return result;
        });
    }
}
exports.DroneRepository = DroneRepository;
