import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function Icon({ icon, size }) {
  const classes = ['fa'];
  if (_.startsWith(icon, 'fa-')) {
    classes.push(icon);
  } else {
    classes.push(`fa-${icon}`);
  }
  if (size) {
    classes.push(size);
  }
  return (
    <i className={classes.join(' ')} />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['', 'fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x']),
};

Icon.defaultProps = {
  size: '',
};
