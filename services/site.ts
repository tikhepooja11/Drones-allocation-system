import { ISite } from "../models/site";
import { Site, ISiteUpdate } from "../libs/service-types/site";
import { SiteRepository } from "../repository/site-repository";

// All Business logic will be here
export class SiteService {
  private repository: SiteRepository;
  constructor() {
    this.repository = new SiteRepository();
  }

  createSite = async (site: Site): Promise<ISite> => {
    console.log("inside createSite() method");
    const result = await this.repository.createSite(site);
    return result;
  };

  getSiteById = async (id: string): Promise<ISite | null> => {
    console.log("siteid", id);
    const site = await this.repository.findById(id);
    return site;
  };

  listAllSites = async (): Promise<ISite[]> => {
    const siteList = await this.repository.listAllSites();
    return siteList;
  };

  updateSiteDetails = async (
    siteId: string,
    updateInput: ISiteUpdate
  ): Promise<ISite | null> => {
    const siteDetails = await this.repository.updateSiteDetails(
      siteId,
      updateInput
    );
    return siteDetails;
  };

  deleteSite = async (siteId: string): Promise<ISite | null> => {
    const siteList = await this.repository.deleteSite(siteId);
    return siteList;
  };
}
