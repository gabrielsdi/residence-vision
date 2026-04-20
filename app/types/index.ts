export type House = {
            id: number,
            address: string,
            homeowner: string,
            price: number,
            photoURL: string
} 

export type HousesResponse = { houses: House[], ok: boolean };