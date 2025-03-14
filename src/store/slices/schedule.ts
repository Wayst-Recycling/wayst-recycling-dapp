/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { PICKUP_MATERIAL, SCHEDULE_REDUCER_PATH } from '../constants/schedule';
import type { MaterialType } from '@/lib/pages/schedule/utils/types';

const initialState = {
  [PICKUP_MATERIAL]: 'plastic',
};

export const scheduleSlice = createSlice({
  name: SCHEDULE_REDUCER_PATH,
  initialState,
  reducers: {
    setPickupMaterial: (state, { payload }: PayloadAction<MaterialType>) => {
      state[PICKUP_MATERIAL] = payload;
    },
  },
});

export const scheduleReducer = scheduleSlice.reducer;

export const { setPickupMaterial } = scheduleSlice.actions;
