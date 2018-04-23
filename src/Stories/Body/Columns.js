import PropTypes from 'prop-types';

import Column from './Column';

import { withStateContext } from '../Context';

const { range } = lodash;

const Columns = ({ columnCount }) =>
  range(0, columnCount).map(columnNumber => (
    <Column columnNumber={columnNumber} key={columnNumber} />
  ));

Columns.propTypes = {
  columnCount: PropTypes.number.isRequired,
};

export default withStateContext(Columns);
