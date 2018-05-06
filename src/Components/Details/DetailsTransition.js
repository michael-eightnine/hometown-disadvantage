import React from 'react';
import PropTypes from 'prop-types';
import { IMAGE_CONTENT_PATH } from 'Data/constants';

const DetailsTransition = ({
  title,
  subtitle,
  media,
  mediaType,
  chapter,
  isActive
}) => {
  const className = isActive
    ? 'grid__transition grid__transition--active'
    : 'grid__transition grid__transition--hidden';

  return (
    <div className={className}>
      <h1 className="grid__transition-title">
        <span>[Chapter {chapter + 1}]</span>
        {title}
      </h1>
      <p className="grid__transition-subtitle">{subtitle}</p>
      {media &&
        <img
          className="grid__transition-media"
          src={`${IMAGE_CONTENT_PATH}${media}${mediaType}`}
          alt=":)"
        />
      }
    </div>
  );
}

DetailsTransition.defaultProps = {
  mediaType: '.jpg'
};

DetailsTransition.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  media: PropTypes.string,
  mediaType: PropTypes.string,
  chapter: PropTypes.number,
  isActive: PropTypes.bool
};

export default DetailsTransition;
