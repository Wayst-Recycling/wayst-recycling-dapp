/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

import type { ApiError } from '@/api/api.types';

/**
 * Handles API errors by extracting the error message and optionally displaying a toast notification.
 * This is designed to be used in catch blocks or onError callbacks.
 *
 * @param error The error object (expected to be of type ApiError)
 * @param defaultMessage A fallback message to display if the error object doesn't have a message
 * @param showToast Whether to display a toast notification (defaults to true)
 * @returns The extracted error message
 */
export const handleApiError = (
  error: any,
  defaultMessage: string = 'An unexpected error occurred',
  showToast: boolean = true
): string => {
  const apiError = error as ApiError;
  const message = apiError?.errorMessage || error?.message || defaultMessage;

  if (showToast) {
    toast.error(message);
  }

  return message;
};
