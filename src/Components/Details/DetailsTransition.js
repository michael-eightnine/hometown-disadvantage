import React from 'react';
import PropTypes from 'prop-types';
import { IMAGE_CONTENT_PATH } from 'Data/constants';

/**
 * Details Transition
 * Displays the transition view before fading out to reveal the detail view below
 * Fade out time is determined by the parent component `Details`, and the fade animation
 * is controlled via css classes
 *
 * @param {object} props - react props
 * @param {string} props.title - the title of the chapter transition
 * @param {string} props.subtitle - the subtitle of the chapter transition
 * @param {string} props.media - the media name of the chapter transition
 * @param {string} props.mediaType - the media extension (jpg/png/gif/etc)
 * @param {number} props.chapter - the index of the chapter being transitioned to
 * @param {boolean} props.isActive - is this transition active?
 */
const DetailsTransition = ({
  title,
  subtitle,
  media,
  mediaType,
  chapter,
  isActive
}) => {
  const className = isActive
    ? 'details__transition details__transition--active'
    : 'details__transition details__transition--hidden';

  return (
    <div className={className}>
      <h1 className="details__transition-title">
        <span>[Chapter {chapter + 1}]</span>
        {title}
      </h1>
      <p className="details__transition-subtitle">{subtitle}</p>
      {/* Only display the media content if media is provided and the transition is visible */}
      {media && isActive &&
        <img
          className="details__transition-media"
          src={`${IMAGE_CONTENT_PATH}${media}${mediaType}`}
          alt=":)"
        />
      }
    </div>
  );
};

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
