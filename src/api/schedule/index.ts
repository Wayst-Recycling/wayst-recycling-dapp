import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { RPaginated } from '../api.types';

import {
  getDeliveryAddresses,
  getDropoffLocations,
  getSchedules,
  getTotalEarning,
  postCreateDeliveryAddress,
  postScheduleDropoff,
  postSchedulePickup,
} from './function';
import type { Schedule, TLocation } from './types';
import {
  GET_DELIVERY_ADDRESSES_KEY,
  GET_DROPOFF_LOCATIONS_KEY,
  GET_SCHEDULES_KEY,
  GET_TOTAL_EARNING_KEY,
} from './types';

export const useSchedulePickup = () => {
  const {
    mutateAsync: mutate,
    isPending,
    isError,
    error,
    isSuccess: schedulePickupSucces,
  } = useMutation({
    mutationFn: postSchedulePickup,
  });

  return {
    mutate,
    isPending,
    isError,
    error,
    schedulePickupSucces,
    mutateAsync: mutate,
  };
};

export const useScheduleDropoff = () => {
  const {
    mutateAsync: mutate,
    isPending,
    isError,
    error,
    isSuccess: scheduleDropoffSuccess,
  } = useMutation({
    mutationFn: postScheduleDropoff,
  });

  return {
    mutate,
    isPending,
    isError,
    error,
    scheduleDropoffSuccess,
    mutateAsync: mutate,
  };
};

export const useGetSchedules = (
  params?: { page?: number; limit?: number },
  options?: Partial<UseQueryOptions<RPaginated<Schedule>, Error>>
) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_SCHEDULES_KEY, params],
    queryFn: () => getSchedules(params),
    ...options,
  });

  return { data, isPending };
};

export const useGetDropoffLocations = (
  options?: Partial<UseQueryOptions<RPaginated<TLocation>, Error>>
) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_DROPOFF_LOCATIONS_KEY],
    queryFn: () => getDropoffLocations(),
    ...options,
  });

  return { data, isPending };
};

export const useGetTotalEarning = (
  options?: Partial<UseQueryOptions<{ cusd: number; gd: number }, Error>>
) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_TOTAL_EARNING_KEY],
    queryFn: () => getTotalEarning(),
    ...options,
  });

  return { data, isPending };
};

export const useCreateDeliveryAddress = () => {
  const {
    mutateAsync: mutate,
    isPending,
    isError,
    error,
    isSuccess: createDeliveryAddressSuccess,
  } = useMutation({
    mutationFn: postCreateDeliveryAddress,
  });

  return { mutate, isPending, isError, error, createDeliveryAddressSuccess };
};

export const useGetDeliveryAddresses = () => {
  const { data, isPending } = useQuery({
    queryKey: [GET_DELIVERY_ADDRESSES_KEY],
    queryFn: () => getDeliveryAddresses(),
  });

  return { data, isPending };
};
