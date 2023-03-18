import Logging from "../loggers/logging";
import SiteModel, { ISite } from "../models/site";
import { Site, ISiteUpdate } from "../libs/service-types/site";

export class SiteRepository {
  createSite = async (site: Site): Promise<ISite> => {
    Logging.info("inside reposiroty");
    const siteModel = new SiteModel(site);
    const result = await siteModel.save();
    console.log("inside drone repository", result);
    return result;
  };

  findById = async (id: string): Promise<ISite | null> => {
    const result = await SiteModel.findById(id).where("deletedAt").equals(null);
    return result;
  };

  listAllSites = async (): Promise<ISite[]> => {
    const result = await SiteModel.find();
    return result;
  };

  updateSiteDetails = async (
    siteId: string,
    updateInput: ISiteUpdate
  ): Promise<ISite | null> => {
    console.log("siteId", siteId);
    console.log("siteUpdate", updateInput);
    const options = { new: true };
    const result = await SiteModel.findByIdAndUpdate(
      siteId,
      updateInput,
      options
    );
    return result;
  };

  deleteSite = async (siteId: string): Promise<ISite | null> => {
    console.log("inside site repository", siteId);
    const result = await SiteModel.findByIdAndDelete(siteId);
    console.log("result", result);
    return result;
  };
}
