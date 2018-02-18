import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import { Link, withRouter } from 'react-router-dom';
import { IMAGE_CONTENT_PATH } from 'Data/constants';

/**
 * Displays the grid details overlay/full screen modal
 * Shows the image, title, subtitle and symbol
 * Includes next/prev buttons and the current "page" number out of total items
 * Additionally handles arrow key & touchswipe controls for next/prev navigation
 *
 * @param {object} props - props object
 * @param {object} props.item - the grid item to provide details for
 * @param {number} props.prevItem - the previous item's index to link to
 * @param {number} props.nextItem - the next item's index to link to
 * @param {number} props.count - total number of grid items
 * @param {number} props.current - current selected index relative to grid items array
 *
 * @returns {Component} - GridDetails component
 */
class GridDetails extends Component {
  // Attach keypress event listener on mount
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  // Unbind keypress event listener on unmount
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  /**
   * Handles arrow key & escape keypresses, updating our route accordignly
   *
   * @param {object} e - the keypress event object
   */
  handleKeyPress = (e) => {
    const key = e.key || e.keyCode;
    const { history, nextItem, prevItem } = this.props;
    switch (key) {
      // Left & Up arrows go to previous
      case 'ArrowLeft' || 37 || 'ArrowUp' || 38 : {
        history.push(`/content-stream/${prevItem}`);
        break;
      }
      // Right & Down arrows go to next
      case 'ArrowRight' || 39 || 'ArrowDown' || 40 : {
        history.push(`/content-stream/${nextItem}`);
        break;
      }
      // Escape "closes" this view, returning to grid
      case 'Escape' || 27: {
        history.push('/content-stream');
        break;
      }
      default: return
    }
  }

  /**
   * On completion of a touch swipe, go to a new detail view
   * This emulates the same functionality as `handleKeyPress`, but with swiping as the action
   *
   * @param {number} newIndex - index of the detail view to redirect to
   */
  onSwiped = (newIndex) => {
    this.props.history.push(`/content-stream/${newIndex}`);
  }

  render() {
    const {
      item: {
        image,
        title,
        subtitle,
        symbol
      },
      prevItem,
      nextItem,
      count,
      current
    } = this.props;

    const imageSrc = `${IMAGE_CONTENT_PATH}${image}`;
    const symbolSrc = `${IMAGE_CONTENT_PATH}${symbol}`;

    return (
      <Swipeable
        onSwipedUp={() => this.onSwiped(nextItem)}
        onSwipedLeft={() => this.onSwiped(nextItem)}
        onSwipedRight={() => this.onSwiped(prevItem)}
        onSwipedDown={() => this.onSwiped(prevItem)}
      >
        <div className="grid__details">
          <div className="details__image">
            <img src={imageSrc} alt={title} />
            <div className="details__count">
              {`${current + 1} / ${count + 1}`}
            </div>
          </div>
          <div className="details__copy">
            {/* <img className="details__symbol" src={symbolSrc} alt="?" /> */}
            <img className="details__symbol" src="https://i.ebayimg.com/thumbs/images/m/mIr1ZhEgiiXWMDr4AGABn2g/s-l225.jpg" />
            <h2>{title}</h2>
            <p>[{subtitle}]</p>
          </div>
          <div className="details__control">
            <Link
              className="details__next standard-link"
              to={`/content-stream/${nextItem}`}
            >
              [next]
            </Link>
            <Link
              className="details__prev standard-link"
              to={`/content-stream/${prevItem}`}
            >
              [prev]
            </Link>
          </div>
        </div>
      </Swipeable>
    )
  }
};

GridDetails.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    symbol: PropTypes.string
  }),
  prevItem: PropTypes.number.isRequired,
  nextItem: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(GridDetails);
