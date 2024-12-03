export interface Listing {
    owner?: string;
    category: string;
    title: string;
    description: string;
    imageURls?: string[];
    price: number;
    _id: string;
  }
