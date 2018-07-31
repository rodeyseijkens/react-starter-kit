/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Link from './Link';

// mock history dependency
import history from '../../../history';

jest.mock('../../../history', () => ({
  push: jest.fn(),
}));

describe('<Link />', () => {
  const props = {
    to: '/internal-link',
    children: ['Internal Link'],
  };

  const wrapper = shallow(<Link {...props} />);

  describe('is rendering', () => {
    it('href correctly', () => {
      expect(wrapper.find('a').prop('href')).toBe('/internal-link');
    });

    it('text correctly', () => {
      expect(wrapper.text()).toBe('Internal Link');
    });

    it('children correctly', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('click event', () => {
    const mockEvent = { button: 0, preventDefault: jest.fn() };

    it('does not push to history on modified event', () => {
      wrapper.find('a').simulate('click', {
        ...mockEvent,
        metaKey: true,
      });
      wrapper.find('a').simulate('click', {
        ...mockEvent,
        altKey: true,
      });
      wrapper.find('a').simulate('click', {
        ...mockEvent,
        ctrlKey: true,
      });
      wrapper.find('a').simulate('click', {
        ...mockEvent,
        shiftKey: true,
      });
      expect(history.push).not.toHaveBeenCalled();
    });

    it('does not push to history on non leftClick', () => {
      wrapper.find('a').simulate('click', { ...mockEvent, button: 1 });
      expect(history.push).not.toHaveBeenCalled();
    });

    it('does not push to history when default is prevented', () => {
      wrapper
        .find('a')
        .simulate('click', { ...mockEvent, defaultPrevented: true });
      expect(history.push).not.toHaveBeenCalled();
    });

    it('does call custom onClick', () => {
      const onClick = jest.fn();
      wrapper.setProps({ onClick });
      wrapper.find('a').simulate('click', mockEvent);
      expect(onClick).toHaveBeenCalled();
    });

    it('does push to history', () => {
      wrapper.find('a').simulate('click', mockEvent);
      expect(history.push).toHaveBeenCalledWith('/internal-link');
    });
  });
});
