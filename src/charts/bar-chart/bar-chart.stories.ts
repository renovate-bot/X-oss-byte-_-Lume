import { withSizeArgs, withSizeArgTypes } from '@/utils/storybook-helpers';

import BarChart from './index';

import { options as singleBarOptions } from '@/charts/single-bar-chart/defaults';
import { options as multiBarOptions } from '@/charts/grouped-bar-chart/defaults';

import { ORIENTATIONS } from '@/constants';

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default {
  title: 'Charts/Bar chart',
  component: BarChart,
  argTypes: {
    ...withSizeArgTypes(),
    orientation: {
      control: 'radio',
      options: [ORIENTATIONS.VERTICAL, ORIENTATIONS.HORIZONTAL],
    },
    options: {
      control: 'object',
      description: 'Chart/axes options.',
    },
  },
  args: {
    ...withSizeArgs(),
    options: {},
  },
};

export const SingleBarChart = ({ argTypes }) => {
  return {
    components: { BarChart },
    props: Object.keys(argTypes),
    template: `
    <div :style="{ width: width + 'px', height: height + 'px' }">
        <bar-chart
           :data="data" :labels="labels" :orientation="orientation" :options="options"
        >
        </bar-chart>
    </div>
  `,
  };
};
SingleBarChart.args = {
  data: [
    {
      values: [30, -10, 20, 70, 50, null, 40],
      color: '02',
      label: 'Hot dogs',
    },
  ],
  labels,
  orientation: ORIENTATIONS.VERTICAL,
  options: singleBarOptions[ORIENTATIONS.VERTICAL],
};

export const MultiBarChart = ({ argTypes }) => {
  return {
    components: { BarChart },
    props: Object.keys(argTypes),
    template: `
    <div :style="{ width: width + 'px', height: height + 'px' }">
        <bar-chart
           :data="data" :labels="labels" :type="type" :orientation="orientation" :options="options"
        >
        </bar-chart>
    </div>
  `,
  };
};
MultiBarChart.argTypes = {
  type: { control: 'radio', options: ['grouped', 'stacked'] },
};
MultiBarChart.args = {
  type: 'grouped',
  data: [
    {
      values: [10, 30, -20, 50, 40, 70, 60],
      color: '01',
      label: 'Hamburgers',
    },
    {
      values: [30, 10, 20, 70, 50, null, 40],
      color: '02',
      label: 'Hot dogs',
    },
    {
      values: [10, 40, 70, 60, 10, 5, 10],
      color: '03',
      label: 'Kebabs',
    },
  ],
  labels,
  orientation: ORIENTATIONS.VERTICAL,
  options: multiBarOptions[ORIENTATIONS.VERTICAL],
};
