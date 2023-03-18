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
exports.SiteService = void 0;
const site_repository_1 = require("../repository/site-repository");
// All Business logic will be here
class SiteService {
    constructor() {
        this.createSite = (site) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside createSite() method");
            const result = yield this.repository.createSite(site);
            return result;
        });
        this.getSiteById = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("siteid", id);
            const site = yield this.repository.findById(id);
            return site;
        });
        this.listAllSites = () => __awaiter(this, void 0, void 0, function* () {
            const siteList = yield this.repository.listAllSites();
            return siteList;
        });
        this.updateSiteDetails = (siteId, updateInput) => __awaiter(this, void 0, void 0, function* () {
            const siteDetails = yield this.repository.updateSiteDetails(siteId, updateInput);
            return siteDetails;
        });
        this.deleteSite = (siteId) => __awaiter(this, void 0, void 0, function* () {
            const siteList = yield this.repository.deleteSite(siteId);
            return siteList;
        });
        this.repository = new site_repository_1.SiteRepository();
    }
}
exports.SiteService = SiteService;
