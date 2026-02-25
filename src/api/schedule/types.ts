export const GET_SCHEDULES_KEY = 'getSchedules' as const;
export const GET_DROPOFF_LOCATIONS_KEY = 'getDropoffLocations' as const;
export const GET_TOTAL_EARNING_KEY = 'getTotalEarning' as const;
export const GET_DELIVERY_ADDRESSES_KEY = 'getDeliveryAddresses' as const;

export interface Schedule {
  address: string;
  amount: string;
  category: string;
  containerAmount: number;
  date: string;
  id: string;
  material: string;
  materialAmount: number;
  schedule_date: string;
  status: string;
  dialCode: string;
  phone: string;
}

export interface TLocation {
  id: string;
  address: string;
  region: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateAddress {
  address: string;
  region: string;
  city: string;
  state: string;
  long: string;
  lat: string;
}

export interface TDeliveryAddress {
  id: string;
  address: string;
  region: string;
  city: string;
  state: string;
  long: string;
  lat: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
