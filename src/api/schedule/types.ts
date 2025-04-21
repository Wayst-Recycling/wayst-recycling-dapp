export const GET_SCHEDULES_KEY = 'getSchedules' as const;
export const GET_DROPOFF_LOCATIONS_KEY = 'getDropoffLocations' as const;
export const GET_TOTAL_EARNING_KEY = 'getTotalEarning' as const;

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
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}
