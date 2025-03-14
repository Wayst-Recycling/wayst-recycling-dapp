export type GeneralApiResponse<T> = {
  data: T;
  error: string[];
  message: string;
  status: number;
};
