import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';

lodash.set(global, 'React', React);
lodash.set(global, 'lodash', lodash);
lodash.set(global, 'wp', {
  element: {
    Component: React.Component,
    render: ReactDOM.render,
    createContext: React.createContext,
  },
});

require('../..');

