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
exports.MissionService = void 0;
const mission_repository_1 = require("../repository/mission-repository");
// All Business logic will be here
class MissionService {
    constructor() {
        this.createMission = (mission) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside createMission() method", mission);
            const result = yield this.repository.createMission(mission);
            console.log("inside repo result", result);
            return result;
        });
        this.getMissionById = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("missionId", id);
            const mission = yield this.repository.findById(id);
            console.log("inside mission repo", mission);
            return mission;
        });
        this.listAllMissions = () => __awaiter(this, void 0, void 0, function* () {
            const missions = yield this.repository.listAllMissions();
            return missions;
        });
        this.getMissionsByCategoryId = (myFilter) => __awaiter(this, void 0, void 0, function* () {
            const droneLists = yield this.repository.getMissionsByCategoryId(myFilter);
            return droneLists;
        });
        this.getMissionsBySiteId = (myFilter) => __awaiter(this, void 0, void 0, function* () {
            const droneLists = yield this.repository.getMissionsBySiteId(myFilter);
            return droneLists;
        });
        this.updateMissionDetails = (misionId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const missionDetails = yield this.repository.updateMissionDetails(misionId, updateInput);
            console.log("inside repo ", missionDetails);
            return missionDetails;
        });
        this.deleteMission = (missionId) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.deleteMission(missionId);
            return category;
        });
        this.repository = new mission_repository_1.MissionRepository();
    }
}
exports.MissionService = MissionService;
