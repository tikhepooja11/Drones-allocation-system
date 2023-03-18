export interface Site {
  name: string;
  position: {
    latitude: string;
    longitude: string;
  };
  createdBy: string;
}

export interface ISiteUpdate {
  name?: string;
  position?: {
    latitude: string;
    longitude: string;
  };
  createdBy?: string;
}
