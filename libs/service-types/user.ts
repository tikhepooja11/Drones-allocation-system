export interface searchDrone {
  field: Record<string, unknown>;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
}
