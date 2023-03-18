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
exports.SiteRepository = void 0;
const logging_1 = __importDefault(require("../library/logging"));
const site_1 = __importDefault(require("../models/site"));
//Dealing with data base operations
class SiteRepository {
    constructor() {
        this.createSite = (site) => __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info("inside reposiroty");
            const siteModel = new site_1.default(site);
            const result = yield siteModel.save();
            console.log("inside drone repository", result);
            return result;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield site_1.default.findById(id).where("deletedAt").equals(null);
            return result;
        });
        this.listAllSites = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield site_1.default.find();
            return result;
        });
        this.updateSiteDetails = (siteId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            console.log("siteId", siteId);
            console.log("siteUpdate", updateInput);
            const options = { new: true };
            const result = yield site_1.default.findByIdAndUpdate(siteId, updateInput, options);
            return result;
        });
        this.deleteSite = (siteId) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside site repository", siteId);
            const result = yield site_1.default.findByIdAndDelete(siteId);
            console.log("result", result);
            return result;
        });
    }
}
exports.SiteRepository = SiteRepository;
