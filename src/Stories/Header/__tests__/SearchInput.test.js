import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { SearchInput } from '../SearchInput';

Enzyme.configure({ adapter: new Adapter() });

test('SearchInput', () => {
  const setSearchTerm = sinon.spy();
  const wrapper = mount(<SearchInput
    searchTerm=""
    setSearchTerm={setSearchTerm}
  />);

  const mockChangeEvent = { target: { value: 'h' } };
  const input = wrapper.find('input');
  input.simulate('change', mockChangeEvent);

  expect(setSearchTerm.calledOnce).toEqual(true);
  expect(setSearchTerm.calledWith('h')).toEqual(true);
});
