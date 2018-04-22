import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { MoreButton } from '../MoreButton';

Enzyme.configure({ adapter: new Adapter() });

test('MoreButton', () => {
  const setCurrentPage = sinon.spy();
  const wrapper = mount(<MoreButton canGetMore currentPage={1} setCurrentPage={setCurrentPage} />);
  wrapper.find('button').simulate('click');
  expect(setCurrentPage.calledOnce).toEqual(true);
  expect(setCurrentPage.calledWith(2)).toEqual(true);
});
