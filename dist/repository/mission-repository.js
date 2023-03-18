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
exports.MissionRepository = void 0;
const mission_1 = __importDefault(require("../models/mission"));
//Dealing with data base operations
class MissionRepository {
    constructor() {
        this.createMission = (mission) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside createMission reposiroty", mission);
            const missionModel = new mission_1.default(mission);
            const result = yield missionModel.save();
            console.log("inside mission repository", result);
            return result;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield mission_1.default.findById(id)
                .where("deletedAt")
                .equals(null);
            return result;
        });
        this.listAllMissions = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield mission_1.default.find();
            return result;
        });
        this.getMissionsByCategoryId = (myfilter) => __awaiter(this, void 0, void 0, function* () {
            const result = yield mission_1.default.find(myfilter);
            console.log("inside repo", result);
            return result;
        });
        this.getMissionsBySiteId = (myfilter) => __awaiter(this, void 0, void 0, function* () {
            const result = yield mission_1.default.find(myfilter);
            console.log("inside repo", result);
            return result;
        });
        this.updateMissionDetails = (missionId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            console.log("missionId", missionId);
            console.log("missionUpdate", updateInput);
            const options = { new: true };
            const result = yield mission_1.default.findByIdAndUpdate(missionId, updateInput, options);
            return result;
        });
        this.deleteMission = (missionId) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside mission repository", missionId);
            const result = yield mission_1.default.findByIdAndDelete(missionId);
            console.log("result", result);
            return result;
        });
    }
}
exports.MissionRepository = MissionRepository;
