import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IMAGE_CONTENT_PATH } from 'Data/constants';

/**
 * Renders a single grid item, which is wrapped in a <Link /> to
 * the corresponding details view path
 *
 * @param {object} props - props object
 * @param {string} props.image - filename for the image to show
 * @param {number} props.to - string composed of `${chapter}/${itemIndex}` that opens
 *                            the detail view for the clicked grid item
 *
 * @returns {Component} - GridItem component
 */
const GridItem = ({ image, to }) => (
  <div className="grid__item">
    <Link to={`/content-stream/${to}`}>
      <img src={`${IMAGE_CONTENT_PATH}${image}.svg`} alt=":(" />
    </Link>
  </div>
);

GridItem.propTypes = {
  image: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default GridItem;
