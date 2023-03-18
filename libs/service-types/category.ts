export interface Category {
  name: string;
  color: string;
  tagName: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICategoryUpdate {
  name?: string;
  color?: string;
  tagName?: string;
}
