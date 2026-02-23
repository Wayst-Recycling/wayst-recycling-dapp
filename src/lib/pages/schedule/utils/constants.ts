import { object, string } from 'yup';

export const PICKUP_MATERIAL_AMOUNT_KEY = 'materialAmount' as const;
export const PICKUP_ADDRESS_KEY = 'address' as const;
export const PICKUP_CONTAINER_AMOUNT_KEY = 'containerAmount' as const;
export const PICKUP_DATE_KEY = 'date' as const;
export const PICKUP_LGA_KEY = 'lga' as const;
export const PICKUP_MATERIAL_KEY = 'material' as const;
export const PICKUP_COUNTRY_CODE_KEY = 'dialCode' as const;
export const PICKUP_PHONE_KEY = 'phone' as const;
export const PICKUP_WALLET_ADDRESS_KEY = 'oxAddress' as const;

export const pickupInitialValues = {
  [PICKUP_MATERIAL_KEY]: 'plastic',
  [PICKUP_CONTAINER_AMOUNT_KEY]: '',
  [PICKUP_MATERIAL_AMOUNT_KEY]: '',
  category: 'pickup',
  pickupAddress: '',
};

export const dropoffInitialValues = {
  [PICKUP_MATERIAL_KEY]: 'plastic',
  [PICKUP_CONTAINER_AMOUNT_KEY]: '',
  [PICKUP_MATERIAL_AMOUNT_KEY]: '',
  category: 'dropoff',
  dropoffAddress: '',
};

export const pickupValidationSchema = object().shape({
  [PICKUP_MATERIAL_KEY]: string().required('Kindly select a material'),
  [PICKUP_CONTAINER_AMOUNT_KEY]: string()
    .required('Number of bags is required')
    .test(
      'Check if container amount is valid',
      'Please provide a valid container amount',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 1) {
          return context.createError({
            message: 'Container amount must be at least 1',
          });
        }

        if (amount > 50) {
          return context.createError({
            message: 'Container amount cannot exceed 50',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      }
    ),
  [PICKUP_MATERIAL_AMOUNT_KEY]: string()
    .required('Number of plastics is required')
    .test(
      'Check if material amount is valid',
      'Please provide a valid material amount',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 50) {
          return context.createError({
            message: 'Material amount must be at least 50',
          });
        }

        if (amount > 10000) {
          return context.createError({
            message: 'Material amount cannot exceed 10,000',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      }
    ),
  // [PICKUP_ADDRESS_KEY]: string().required('Kindly input a valid address'),
  // [PICKUP_PHONE_KEY]: string().required('Kindly input a valid phone number'),
  // [PICKUP_DATE_KEY]: string().required('Kindly select a valid pickup date'),
  pickupAddress: string().required(),
});

export const dropoffValidationSchema = object().shape({
  [PICKUP_MATERIAL_KEY]: string().required('Kindly select a material'),
  [PICKUP_CONTAINER_AMOUNT_KEY]: string()
    .required('Number of bags is required')
    .test(
      'Check if number is valid',
      'Please provide a valid number',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 1) {
          return context.createError({
            message: 'Container amount must be at least 1',
          });
        }

        if (amount > 50) {
          return context.createError({
            message: 'Container amount cannot exceed 50',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      }
    ),
  [PICKUP_MATERIAL_AMOUNT_KEY]: string()
    .required('Number of plastics is required')
    .test(
      'Check if number is valid',
      'Please provide a valid number',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 50) {
          return context.createError({
            message: 'Material amount must be at least 50',
          });
        }

        if (amount > 10000) {
          return context.createError({
            message: 'Material amount cannot exceed 10,000',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      }
    ),
  // [PICKUP_ADDRESS_KEY]: string().required('Kindly input a valid address'),
  // [PICKUP_PHONE_KEY]: string().required('Kindly input a valid phone number'),
  // [PICKUP_DATE_KEY]: string().required('Kindly select a valid pickup date'),
  dropoffAddress: string().required(),
});
