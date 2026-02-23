import type { RPaginated, ApiResponse } from '../api.types';
import http from '../http';

import type {
  ICreateAddress,
  Schedule,
  TDeliveryAddress,
  TLocation,
} from './types';

export const postSchedulePickup = async (data: {
  material: string;
  materialAmount: number;
  category: string;
  containerAmount: number;
  pickupAddress?: string;
  dropoffAddress?: string;
}): Promise<ApiResponse<unknown>> => {
  const res = await http.post<ApiResponse<unknown>>('/schedule', data);
  return res.data;
};

export const postCreateDeliveryAddress = async (
  data: ICreateAddress
): Promise<ApiResponse<unknown>> => {
  const res = await http.post<ApiResponse<unknown>>(
    '/user/delivery-address',
    data
  );
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
}): Promise<ApiResponse<unknown>> => {
  const res = await http.post<ApiResponse<unknown>>('/schedule/dropoff', data);
  return res.data;
};

export const getSchedules = async (params?: {
  page?: number;
  limit?: number;
}): Promise<RPaginated<Schedule>> => {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append('page', params.page.toString());
  if (params?.limit) queryString.append('limit', params.limit.toString());

  const res = await http.get<ApiResponse<RPaginated<Schedule>>>(
    `/schedule?${queryString.toString()}`
  );
  return res.data.data;
};

export const getDeliveryAddresses = async (): Promise<TDeliveryAddress[]> => {
  const res = await http.get<ApiResponse<TDeliveryAddress[]>>(
    `/user/delivery-address`
  );
  return res.data.data;
};

export const getDropoffLocations = async (): Promise<RPaginated<TLocation>> => {
  const res =
    await http.get<ApiResponse<RPaginated<TLocation>>>(`/admin/location`);
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
