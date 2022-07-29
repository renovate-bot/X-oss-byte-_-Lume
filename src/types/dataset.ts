import { Color } from '@/types/colors';

type ChartType = 'bar' | 'line';

export interface DatasetValueObject<T extends number | Array<number> = number> {
  value: T;
  color?: Color;
  label?: string;
}

export type DatasetValue = number | DatasetValueObject | null;

export interface Dataset<T> {
  values: Array<T>;
  color?: Color;
  label?: string;
  areaColor?: Color;
  legend?: string;
  type?: ChartType;
  isDashed?: (index: number) => boolean; // for line datasets
}

export type Data<T extends DatasetValue = DatasetValue> = Array<Dataset<T>>;
