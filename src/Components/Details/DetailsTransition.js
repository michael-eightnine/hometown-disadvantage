import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IMAGE_CONTENT_PATH } from 'Data/constants';

class DetailsTransition extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     active: false
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   // If chapters haven't changed, exit early
  //   if (this.props.chapter === nextProps.chapter) {
  //     return;
  //   }
  //   // Otherwise the chapter has changed, and time to initiate transition changes
  //   this.updateActiveState(true)
  // }
  // //
  // // /**
  // //  * Update Active State
  // //  *
  // //  */
  // // updateActiveState(isActive) {
  // //   const { onActive } = this.props;
  // //   // Set our active state
  // //   this.setState({ active: isActive });
  // //   onActive(isActive);
  // //
  // //   // If it was set to true, reset it in 4s
  // //   if(isActive) {
  // //     setTimeout(() => {
  // //       this.updateActiveState(false)
  // //     }, 4000)
  // //   }
  // // }

  render() {
    const {
      title,
      subtitle,
      media,
      mediaType,
      chapter,
      isActive
    } = this.props;
    // If there's a last location provided, check if it was for a different
    // chapter than the current chapter. If they're different, we need to transition chapters
    const className = isActive
      ? 'grid__transition grid__transition--active'
      : 'grid__transition grid__transition--hidden';

    return (
      <div className={className}>
        <h1 className="grid__transition-title">
          <span>[Chapter {chapter + 1}.]</span>
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
