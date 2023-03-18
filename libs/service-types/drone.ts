export interface Drone {
  createdAt: number;
  droneType: string;
  makeName: string;
  name: string;
  updatedAt: number;
  createdBy: string;
  siteId: string;
  category: string;
}

export interface IDroneUpdate {
  droneType?: string;
  makeName?: string;
  name?: string;
  updatedAt?: number;
  siteId?: string;
  category?: string;
}

export interface searchDrones {
  field: Record<string, unknown>;
}
