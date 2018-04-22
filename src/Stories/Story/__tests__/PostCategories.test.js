import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { PostCategories } from '../PostCategories';
import { categories, posts } from '../../__tests__/testData';

Enzyme.configure({ adapter: new Adapter() });

describe('PostCategories', () => {
  it('renders', () => {
    const tree = renderer.create(<PostCategories
      post={posts[0]}
      categories={categories}
      setActiveCategory={() => null}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles a click', () => {
    const setActiveCategory = sinon.spy();
    const wrapper = mount(<PostCategories
      post={posts[0]}
      categories={categories}
      setActiveCategory={setActiveCategory}
    />);

    const button = wrapper.find('button');
    button.simulate('click');

    expect(setActiveCategory.calledOnce).toEqual(true);
    expect(setActiveCategory.calledWith(String(posts[0].categories[0]))).toEqual(true);
  });
});
