/**
 * This is a wrapper component for different Layouts. Main content should be added to this wrapper.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './LayoutWrapperMainFullWidth.module.css';

const LayoutWrapperMainFullWidth = props => {
  const { className, rootClassName, children } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes} role="main">
      {children}
    </div>
  );
};

LayoutWrapperMainFullWidth.defaultProps = {
  className: null,
  rootClassName: null,
};

const { node, string } = PropTypes;

LayoutWrapperMainFullWidth.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default LayoutWrapperMainFullWidth;
