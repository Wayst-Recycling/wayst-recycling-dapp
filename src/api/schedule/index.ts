import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getDropoffLocations,
  getSchedules,
  getTotalEarning,
  postScheduleDropoff,
  postSchedulePickup,
} from './function';
import {
  GET_DROPOFF_LOCATIONS_KEY,
  GET_SCHEDULES_KEY,
  GET_TOTAL_EARNING_KEY,
} from './types';

export const useSchedulePickup = () => {
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess: schedulePickupSucces,
  } = useMutation({
    mutationFn: postSchedulePickup,
  });

  return { mutate, isPending, isError, error, schedulePickupSucces };
};

export const useScheduleDropoff = () => {
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess: scheduleDropoffSuccess,
  } = useMutation({
    mutationFn: postScheduleDropoff,
  });

  return { mutate, isPending, isError, error, scheduleDropoffSuccess };
};

export const useGetSchedules = (ox: string) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_SCHEDULES_KEY],
    queryFn: () => getSchedules(ox),
  });

  return { data, isPending };
};

export const useGetDropoffLocations = () => {
  const { data, isPending } = useQuery({
    queryKey: [GET_DROPOFF_LOCATIONS_KEY],
    queryFn: () => getDropoffLocations(),
  });

  return { data, isPending };
};

export const useGetTotalEarning = () => {
  const { data, isPending } = useQuery({
    queryKey: [GET_TOTAL_EARNING_KEY],
    queryFn: () => getTotalEarning(),
  });

  return { data, isPending };
};
