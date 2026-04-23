export type House = {
  id: number;
  uuid: string;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
};

export type HousesResponse = { houses: House[]; ok: boolean };
