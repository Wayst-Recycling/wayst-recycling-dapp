import http from '../http';
import type { GeneralApiResponse } from '@/lib/types';

import type { Schedule, TLocation } from './types';

export const postSchedulePickup = async (data: {
  oxAddress: string;
  material: string;
  material_amount: number;
  container_amount: number;
  address: string;
  date: string;
  country_code: string;
  phone: string;
}): Promise<GeneralApiResponse<unknown>> => {
  const res = await http.post('/schedule/pickup', data);
  return res.data;
};

export const postScheduleDropoff = async (data: {
  oxAddress: string;
  material: string;
  material_amount: number;
  container_amount: number;
  address: string;
  date: string;
  country_code: string;
  phone: string;
}): Promise<GeneralApiResponse<unknown>> => {
  const res = await http.post('/schedule/dropoff', data);
  return res.data;
};

export const getSchedules = async (ox: string): Promise<Schedule[]> => {
  const res = await http.get(`/schedule/${ox}`);
  return res.data.data;
};

export const getDropoffLocations = async (): Promise<TLocation[]> => {
  const res = await http.get(`/admin/dropoff/location`);
  return res.data.data;
};

export const getTotalEarning = async (
  ox: string
): Promise<{ total: number }> => {
  const res = await http.get(`/transactions/${ox}/totalEarnings`);
  return res.data.data;
};
