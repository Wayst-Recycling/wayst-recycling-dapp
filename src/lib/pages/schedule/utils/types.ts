export type MaterialType =
  | 'plastic'
  | 'metal'
  | 'paper'
  | 'e-waste'
  | 'organic'
  | 'glass'
  | 'mixed';

export type MaterialCategory = {
  label: string;
  value: MaterialType;
  backgroundColor: string;
  image: string;
  active: boolean;
};
