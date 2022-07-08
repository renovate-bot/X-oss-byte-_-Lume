import { computed, Ref, ComputedRef } from '@vue/composition-api';
import { ScaleBand, ScaleLinear } from 'd3-scale';

import { flatValues } from '@/utils/helpers';

import { Data, DatasetValueObject } from '@/types/dataset';
import { ContainerSize } from '@/types/size';

type AnyScale = ScaleBand<string | number> | ScaleLinear<number, number, never>;

export function checkNegativeValues(data: Ref<Data<DatasetValueObject>>) {
  const hasNegativeValues = computed(() =>
    flatValues(data.value).some((v) => v < 0)
  );
  return { hasNegativeValues };
}

export function useNegativeValues(
  containerSize?: ContainerSize,
  // eslint-disable-next-line @typescript-eslint/ban-types
  xScale?: Ref<AnyScale>,
  yScale?: Ref<AnyScale>,
  isHorizontal?: ComputedRef<boolean>
) {
  const negativeHeight = computed(
    () =>
      containerSize.height - (isHorizontal?.value ? 0 : yScale.value?.(0) || 0)
  );

  const negativeWidth = computed(() =>
    isHorizontal?.value ? xScale.value?.(0) || 0 : containerSize.width
  );

  const negativeTransform = computed(() =>
    isHorizontal?.value
      ? `translate(0, 0)`
      : `translate(0, ${yScale.value?.(0) || 0})`
  );

  const negativeBarAttributes = computed(() => ({
    width: negativeWidth.value,
    height: negativeHeight.value,
    transform: negativeTransform.value,
  }));

  return { negativeBarAttributes };
}
