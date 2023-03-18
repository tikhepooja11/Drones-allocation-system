import express from "express";
import Logging from "../loggers/logging";
import { ISiteUpdate } from "../libs/service-types/site";
import { tokenVerifiy } from "../middlewares/auth";
import { SiteService } from "../services/site";

const router = express.Router();

router.post("/create", tokenVerifiy, async (req, res) => {
  const siteService = new SiteService();
  try {
    const { name, position, createdBy } = req.body;
    const site = await siteService.createSite({
      name,
      createdBy,
      position,
    });
    return res.status(200).json(site);
  } catch (error) {
    Logging.error(`Error in creating a new site`);
    return res
      .status(500)
      .send(error)
      .json({ message: "Internal server error" });
  }
});

router.get("/getAll", tokenVerifiy, async (request, response) => {
  Logging.info("Listing all sites");
  const siteService = new SiteService();
  try {
    const siteList = await siteService.listAllSites();
    if (siteList.length > 0) {
      return response.status(200).send(siteList);
    } else {
      return response.status(404).send({ message: "Sites are not found" });
    }
  } catch (error) {
    return response.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getSiteById/:id", tokenVerifiy, async (request, response) => {
  Logging.info("Fetching drone with id");
  const siteService = new SiteService();
  const siteId = request.params.id;
  try {
    const site = await siteService.getSiteById(siteId);
    if (!site) {
      return response.status(404).json({ message: "Site with id not found" });
    }
    return response.status(200).send(site);
  } catch (error) {
    return response.status(500).json({ message: "Internal server error" });
  }
});

// Delete Drone
router.delete("/delete/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Deleting site");
  const siteId = req.params.id;
  const siteService = new SiteService();
  try {
    const deletedSite = await siteService.deleteSite(siteId);
    if (!deletedSite) {
      return res.status(404).json({ message: "Site with id not found" });
    }
    return res.status(200).send(deletedSite);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/update/:id", tokenVerifiy, async (req, res) => {
  Logging.info("Updating site details");
  const siteId = req.params.id;
  console.log(req.body);
  const updateInput: ISiteUpdate = req.body;
  const siteService = new SiteService();
  console.log("updateInput", updateInput);
  try {
    const updatedSite = await siteService.updateSiteDetails(
      siteId,
      updateInput
    );
    if (!updatedSite) {
      return res.status(404).json({ message: "Site with id not found" });
    }
    return res.status(200).send(updatedSite);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export = router;
