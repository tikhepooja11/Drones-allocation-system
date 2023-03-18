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
const site_1 = require("../services/site");
const router = express_1.default.Router();
router.post("/create", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteService = new site_1.SiteService();
    try {
        const { name, position, createdBy } = req.body;
        const site = yield siteService.createSite({
            name,
            createdBy,
            position,
        });
        return res.status(200).json(site);
    }
    catch (error) {
        logging_1.default.error(`Error in creating a new site`);
        return res
            .status(500)
            .send(error)
            .json({ message: "Internal server error" });
    }
}));
router.get("/getAll", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Listing all sites");
    const siteService = new site_1.SiteService();
    try {
        const siteList = yield siteService.listAllSites();
        if (siteList.length > 0) {
            return response.status(200).send(siteList);
        }
        else {
            return response.status(404).send({ message: "Sites are not found" });
        }
    }
    catch (error) {
        return response.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/getSiteById/:id", auth_1.tokenVerifiy, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Fetching drone with id");
    const siteService = new site_1.SiteService();
    const siteId = request.params.id;
    try {
        const site = yield siteService.getSiteById(siteId);
        if (!site) {
            return response.status(404).json({ message: "Site with id not found" });
        }
        return response.status(200).send(site);
    }
    catch (error) {
        return response.status(500).json({ message: "Internal server error" });
    }
}));
// Delete Drone
router.delete("/delete/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Deleting site");
    const siteId = req.params.id;
    const siteService = new site_1.SiteService();
    try {
        const deletedSite = yield siteService.deleteSite(siteId);
        if (!deletedSite) {
            return res.status(404).json({ message: "Site with id not found" });
        }
        return res.status(200).send(deletedSite);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.patch("/update/:id", auth_1.tokenVerifiy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info("Updating site details");
    const siteId = req.params.id;
    console.log(req.body);
    const updateInput = req.body;
    const siteService = new site_1.SiteService();
    console.log("updateInput", updateInput);
    try {
        const updatedSite = yield siteService.updateSiteDetails(siteId, updateInput);
        if (!updatedSite) {
            return res.status(404).json({ message: "Site with id not found" });
        }
        return res.status(200).send(updatedSite);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
