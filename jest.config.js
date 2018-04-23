const React = require('react');
const ReactDOM = require('react-dom');
const lodash = require('lodash');

module.exports = {
  testMatch: ['**/?(*.)(spec|test).js?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.js'],
  globals: {
    React,
    lodash,
    wp: {
      element: {
        Component: React.Component,
        render: ReactDOM.render,
        createContext: React.createContext,
      },
    },
  },
};
