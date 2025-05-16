// src/types.ts
export type Tour = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type TourForBooking = Omit<Tour, 'id'> & { id: string };