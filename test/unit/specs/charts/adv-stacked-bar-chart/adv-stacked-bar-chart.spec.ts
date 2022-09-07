import { mount } from '@vue/test-utils';
import { data, generateData, generateLinearScale, labels, xScale, yScale } from '../../mock-data';
import StackedBarChart from '@/charts/adv-stacked-bar-chart/adv-stacked-bar-chart.vue';
import { Orientation } from '@/constants';

const orientation: Orientation = 'horizontal';
const numberOfBars = data[0].values.length;

describe('adv-stacked-bar-chart.vue', () => {
  test('mounts component and sets prop values', () => {
    const wrapper = mount(StackedBarChart, {
      propsData: { data, labels, xScale, yScale }
    });

    const el = wrapper.find('[data-j-stacked-bar-chart]')
    expect(el.exists()).toBeTruthy();
    expect(el.find('[data-j-bars-group]').exists()).toBeTruthy();
    const barsGroupComponent = el.find('[data-j-bars-group]');
    expect(barsGroupComponent.props('orientation')).toEqual('vertical');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(numberOfBars);
  });

  test('mounts component and sets custom orientation', () => {
    const wrapper = mount(StackedBarChart, {
      propsData: { data, labels, xScale, yScale, orientation }
    });

    const el = wrapper.find('[data-j-bars-group]')
    expect(el.props('orientation')).toEqual('horizontal');
  });

  test('mounts component with double dataset', () => {
    const numberOfSets = 2;
    const manipulatedData = generateData(numberOfSets, data[0].values.length)
    const manipulatedDataLinearScale = generateLinearScale(manipulatedData);
    const wrapper = mount(StackedBarChart, {
      // Note that we need to flip the scales so as to feed band and linear scales correctly
      propsData: { data: manipulatedData, labels, xScale, yScale: manipulatedDataLinearScale }
    });

    const el = wrapper.find('[data-j-bars-group]');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(numberOfSets * numberOfBars);
  });

  test('mounts component with double dataset and custom orientation', () => {
    const numberOfSets = 2;
    const manipulatedData = generateData(numberOfSets, data[0].values.length)
    const manipulatedDataLinearScale = generateLinearScale(manipulatedData);
    const wrapper = mount(StackedBarChart, {
      // Note that we need to flip the scales so as to feed band and linear scales correctly
      propsData: { data: manipulatedData, labels, yScale: xScale, xScale: manipulatedDataLinearScale, orientation }
    });

    const el = wrapper.find('[data-j-bars-group]');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(numberOfSets * numberOfBars);
  });

  test('mounts component with double dataset with negative values', () => {
    const numberOfSets = 2;
    const manipulatedData = generateData(numberOfSets, data[0].values.length, 1000, false, true);
    const manipulatedDataLinearScale = generateLinearScale(manipulatedData);
    const wrapper = mount(StackedBarChart, {
      // Note that we need to flip the scales so as to feed band and linear scales correctly
      propsData: { data: manipulatedData, labels, xScale, yScale: manipulatedDataLinearScale }
    });

    const el = wrapper.find('[data-j-bars-group]');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(numberOfSets * numberOfBars);
  });

  test('mounts component with double dataset and custom orientation with negative values', () => {
    const numberOfSets = 2;
    const manipulatedData = generateData(numberOfSets, data[0].values.length, 1000, false, true);
    const manipulatedDataLinearScale = generateLinearScale(manipulatedData);
    const wrapper = mount(StackedBarChart, {
      // Note that we need to flip the scales so as to feed band and linear scales correctly
      propsData: { data: manipulatedData, labels, yScale: xScale, xScale: manipulatedDataLinearScale, orientation }
    });

    const el = wrapper.find('[data-j-bars-group]');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(numberOfSets * numberOfBars);
  });

  test('mounts component and updates dataset', async () => {
    const firstNumberOfSets = 3;
    const firstNumberOfRecords = 7;
    const secondNumberOfSets = 4;
    const secondNumberOfRecords = 5;
    const firstDataSet = generateData(firstNumberOfSets, firstNumberOfRecords);
    const secondDataSet = generateData(secondNumberOfSets, secondNumberOfRecords);

    const wrapper = mount(StackedBarChart, {
      // Note that we need to flip the scales so as to feed band and linear scales correctly
      propsData: { data: firstDataSet, labels, yScale, xScale }
    });

    const el = wrapper.find('[data-j-bars-group]');
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(firstNumberOfSets * firstNumberOfRecords);
    await wrapper.setProps({ data: secondDataSet });
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(secondNumberOfSets * secondNumberOfRecords);
    await wrapper.setProps({ data: [{ values: [] }] });
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(0);
    await wrapper.setProps({ data: secondDataSet });
    expect(el.findAll('[data-j-adv-bar]')).toHaveLength(secondNumberOfSets * secondNumberOfRecords);
  });
});
