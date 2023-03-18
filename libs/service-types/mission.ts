export interface Mission {
  alt: number;
  speed: number;
  name: string;
  waypoints: [
    {
      alt: number;
      lat: number;
      long: number;
    }
  ];
  createdAt: number;
  updatedAt: number;
  siteId: string;
  category: string;
  createdBy: string;
  isRunnable: boolean;
}

export interface IMissionUpdate {
  alt: number;
  speed?: number;
  name?: string;
  waypoints?: [
    {
      alt: number;
      lat: number;
      long: number;
    }
  ];
  updatedAt?: number;
  siteId?: string;
  category?: string;
  createdBy?: string;
  isRunnable?: boolean;
}
