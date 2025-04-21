import type { RPaginated } from '../api.types';
import http from '../http';
import type { GeneralApiResponse } from '@/lib/types';

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
}): Promise<GeneralApiResponse<unknown>> => {
  const res = await http.post('/schedule/pickup', data);
  return res.data;
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
}): Promise<GeneralApiResponse<unknown>> => {
  const res = await http.post('/schedule/dropoff', data);
  return res.data;
};

export const getSchedules = async (ox: string): Promise<Schedule[]> => {
  const res = await http.get(`/schedule/${ox}`);
  return res.data.data;
};

export const getDropoffLocations = async (): Promise<RPaginated<TLocation>> => {
  const res = await http.get(`/location`);
  return res.data.data;
};

export const getTotalEarning = async (
  ox: string
): Promise<{ total: number }> => {
  const res = await http.get(`/transaction/${ox}/total-earnings`);
  return res.data.data;
};
