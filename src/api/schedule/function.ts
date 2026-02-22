import type { RPaginated, ApiResponse } from '../api.types';
import http from '../http';

import type { Schedule, TLocation } from './types';

export const postSchedulePickup = async (data: {
  oxAddress: string;
  material: string;
  materialAmount: number;
  containerAmount: number;
  address: string;
  date: string;
  dialCode: string;
  phone: string;
}): Promise<ApiResponse<unknown>> => {
  return http.post('/schedule/pickup', data);
};

export const postScheduleDropoff = async (data: {
  oxAddress: string;
  material: string;
  materialAmount: number;
  containerAmount: number;
  address: string;
  date: string;
  dialCode: string;
  phone: string;
}): Promise<ApiResponse<unknown>> => {
  return http.post('/schedule/dropoff', data);
};

export const getSchedules = async (ox: string): Promise<Schedule[]> => {
  const res = await http.get<ApiResponse<Schedule[]>>(`/schedule/${ox}`);
  return res.data.data;
};

export const getDropoffLocations = async (): Promise<RPaginated<TLocation>> => {
  const res = await http.get<ApiResponse<RPaginated<TLocation>>>(`/location`);
  return res.data.data;
};

export const getTotalEarning = async (): Promise<{
  cusd: number;
  gd: number;
}> => {
  const res = await http.get<ApiResponse<{ cusd: number; gd: number }>>(
    `/transaction/total-earnings`
  );
  return res.data.data;
};
