import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { CategoryPicker } from '../CategoryPicker';

import { categories } from '../../__tests__/testData';

Enzyme.configure({ adapter: new Adapter() });

test('CategoryPicker', () => {
  const setActiveCategory = sinon.spy();
  const wrapper = mount(<CategoryPicker
    categories={categories}
    activeCategory={categories[0].id}
    setActiveCategory={setActiveCategory}
  />);

  const mockChangeEvent = { target: { value: '3' } };
  const select = wrapper.find('select');
  select.simulate('change', mockChangeEvent);

  expect(setActiveCategory.calledOnce).toEqual(true);
  expect(setActiveCategory.calledWith('3')).toEqual(true);
});
