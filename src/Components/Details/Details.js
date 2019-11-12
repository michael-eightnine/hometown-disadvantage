import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import { withRouter } from 'react-router-dom';
import { IMAGE_CONTENT_PATH, streamData } from 'Data';
import DetailsTransition from './DetailsTransition';
import './details.scss';

/**
 * Displays the grid details view
 * Shows the image, title, subtitle and symbol
 * Includes next/prev buttons, the current "page" number out of total items,
 * and the current chapter out of total chapters.
 * Additionally handles arrow key & touchswipe controls for next/prev navigation,
 * and navigation between chapters when the current chapter ends
 *
 * @param {object} props - props object
 * @param {object} props.item - the grid item to provide details for
 * @param {number} props.prevItem - the previous item's index to link to
 * @param {number} props.nextItem - the next item's index to link to
 * @param {number} props.count - total number of grid items
 * @param {number} props.current - current selected index relative to grid items array
 * @param {number} props.chapter - the current chapter of content to display items from
 *
 * @returns {ReactComponent} - Details component
 */
class Details extends Component {
  state = { transitionActive: false };

  // Attach keypress event listener on mount
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  // Unbind keypress event listener on unmount
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps) {
    const { chapter } = this.props;
    // If chapters haven't changed, exit early
    if (chapter === prevProps.chapter) {
      return;
    }
    // Otherwise the chapter has changed, and time to initiate transition changes
    this.updateTransitionState(true);
  }

  /**
   * Update Transition State
   * Updates internal state to indicate if a chapter transition is currently occurring
   * This is called by `DetailsTransition` when its active state changes to block route
   * changes during that transition.
   *
   * @param {boolean} transitionState - are we actively transitioning chapters?
   */
  updateTransitionState = transitionState => {
    this.setState({ transitionActive: transitionState });

    // If it was set to true, reset after a timeout
    if (transitionState) {
      setTimeout(() => {
        // this.updateTransitionState(false);
      }, 8250);
    }
  };

  /**
   * Handle Route Change
   * Handles all route changes triggered via the prev/next buttons,
   * arrow keys, and swiping
   * Redirects to the next/prev item based on the provided `direction`
   * When reaching the start/end of a chapter, it redirects to the next chapter
   *
   * @param {string} direction - is this going to 'prev' or 'next'?
   */
  handleRouteChange = direction => {
    // If we have a chapter transition active, do not redirect the route
    if (this.state.transitionActive) return;

    const { current, nextItem, prevItem, count, history, chapter } = this.props;
    const atStart = chapter === 0 && current === 0;
    const atEnd = chapter === streamData.length - 1 && current === count;
    // If we're at the starting or ending chapter and item and moving in that direction, do nothing
    if ((direction === 'prev' && atStart) || (direction === 'next' && atEnd))
      return;

    const atChapterStart = current === 0;
    const atChapterEnd = current === count;
    let newRoute;
    switch (direction) {
      case 'next':
        newRoute = atChapterEnd
          ? // If at the chapter end, go to the next chapter's first item
            `/content-stream/${chapter + 1}/0`
          : // Otherwise just go to the next item
            `/content-stream/${chapter}/${nextItem}`;
        break;
      case 'prev':
        newRoute = atChapterStart
          ? // If at the chapter start, go to the previous chapter's first item
            // this restarts the previous chapter, since we're moving backwards
            `/content-stream/${chapter - 1}/0`
          : // Otherwise just go to the previous item
            `/content-stream/${chapter}/${prevItem}`;
        break;
      default:
        newRoute = '/content-stream/0';
    }
    history.push(newRoute);
  };

  /**
   * Handles arrow key & escape keypresses, updating our route accordignly
   *
   * @param {object} e - the keypress event object
   */
  handleKeyPress = e => {
    const key = e.key || e.keyCode;
    const { history, chapter } = this.props;

    switch (key) {
      // Left & Up arrows go to previous
      case 'ArrowLeft' || 37: {
        e.preventDefault();
        this.handleRouteChange('prev');
        break;
      }
      case 'ArrowUp' || 38: {
        e.preventDefault();
        this.handleRouteChange('prev');
        break;
      }
      // Right & Down arrows go to next
      case 'ArrowRight' || 39: {
        e.preventDefault();
        this.handleRouteChange('next');
        break;
      }
      case 'ArrowDown' || 40: {
        e.preventDefault();
        this.handleRouteChange('next');
        break;
      }
      // Escape "closes" this view, returning to grid
      case 'Escape' || 27: {
        e.preventDefault();
        history.push(`/content-stream/${chapter}`);
        break;
      }
      default:
        return;
    }
  };

  render() {
    const {
      item: { image, title, subtitle },
      count,
      current,
      chapter
    } = this.props;
    const { transitionActive } = this.state;
    const atStart = chapter === 0 && current === 0;
    const atEnd = chapter === streamData.length - 1 && current === count;

    const transitionMetadata = streamData[chapter].meta;
    const imageSrc = `${IMAGE_CONTENT_PATH}${image}.svg`;
    const symbolSrc = `${IMAGE_CONTENT_PATH}${image}.jpg`;

    return (
      <Swipeable
        onSwipedLeft={() => this.handleRouteChange('next')}
        onSwipedRight={() => this.handleRouteChange('prev')}
      >
        <DetailsTransition
          isActive={transitionActive}
          title={transitionMetadata.title}
          subtitle={transitionMetadata.subtitle}
          media={transitionMetadata.media}
          mediaType={transitionMetadata.mediaType}
          chapter={chapter}
        />
        <div className="grid__details">
          <div className="details__image">
            <img src={imageSrc} alt={title} />
            <div className="details__count">
              {`${current + 1} / ${count + 1}`}
            </div>
            <div className="details__chapter-count">
              {`[Chapter ${chapter + 1}]`}
            </div>
          </div>
          <div className="details__copy">
            <img className="details__symbol" src={symbolSrc} alt="?symbol?" />
            <h2>{title}</h2>
            <p>[{subtitle}]</p>
          </div>
          <div className="details__control">
            <div
              className="details__next standard-link"
              onClick={() => this.handleRouteChange('next')}
              disabled={atEnd}
            >
              [next]
            </div>
            <div
              className="details__prev standard-link"
              onClick={() => this.handleRouteChange('prev')}
              disabled={atStart}
            >
              [prev]
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}

Details.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  }),
  prevItem: PropTypes.number.isRequired,
  nextItem: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  chapter: PropTypes.number.isRequired
};

export default withRouter(Details);
