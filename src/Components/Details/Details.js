import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import { withRouter } from 'react-router-dom';
import { IMAGE_CONTENT_PATH } from 'Data/constants';
import streamContent from 'Data/streamData'
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
 * @param {number} props.chapterCount - the total number of chapters available
 * @param {number} props.nextChapter - the next chapter to load after ending this chapter
 *
 * @returns {ReactComponent} - Details component
 */
class Details extends Component {
  // Attach keypress event listener on mount
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  // Unbind keypress event listener on unmount
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  /**
   * Handle Route Change
   * Handles all route changes triggered via the prev/next buttons,
   * arrow keys, and swiping
   * Redirects to the next/prev item based on the provided `direction`
   * When reaching the start/end of a chapter, it redirects to the next chapter
   *
   * @param {string} direction - is this going to 'prev' or 'next'?
   */
  handleRouteChange = (direction) => {
    const {
      current,
      nextItem,
      prevItem,
      count,
      history,
      chapter,
      nextChapter
     } = this.props;
    const atChapterEnd = current === count;
    const atChapterStart = current === 0;
    let newRoute;
    switch (direction) {
      case 'next':
        newRoute = atChapterEnd
          // If at the chapter end, go to the next chapter's first item
          ? `/content-stream/${nextChapter}/0`
          // Otherwise just go to the next item
          : `/content-stream/${chapter}/${nextItem}`
        break;
      case 'prev':
        newRoute = atChapterStart
          // If at the chapter start, go to the next chapter's last item (since we're moving backwards)
          ? `/content-stream/${nextChapter}/${streamContent[nextChapter].content.length - 1}`
          // Otherwise just go to the previous item
          : `/content-stream/${chapter}/${prevItem}`
        break;
      default:
        newRoute = '/content-stream/0'
    };
    history.push(newRoute);
  }

  /**
   * Handles arrow key & escape keypresses, updating our route accordignly
   *
   * @param {object} e - the keypress event object
   */
  handleKeyPress = (e) => {
    const key = e.key || e.keyCode;
    const { history, chapter } = this.props;

    switch (key) {
      // Left & Up arrows go to previous
      case 'ArrowLeft' || 37: {
        e.preventDefault();
        this.handleRouteChange('prev');
        break;
      }
      case 'ArrowUp' || 38 : {
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
      case 'ArrowDown' || 40 : {
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
      default: return
    }
  }

  render() {
    const {
      item: {
        image,
        title,
        subtitle
      },
      count,
      current,
      chapter,
      chapterCount
    } = this.props;

    const imageSrc = `${IMAGE_CONTENT_PATH}${image}.svg`;
    const symbolSrc = `${IMAGE_CONTENT_PATH}${image}.jpg`;

    return (
      <Swipeable
        onSwipedUp={() => this.handleRouteChange('next')}
        onSwipedLeft={() => this.handleRouteChange('next')}
        onSwipedRight={() => this.handleRouteChange('prev')}
        onSwipedDown={() => this.handleRouteChange('prev')}
      >
        <div className="grid__details">
          <div className="details__image">
            <img src={imageSrc} alt={title} />
            <div className="details__count">
              {`${current + 1} / ${count + 1}`}
              <span className="details__chapter-count">
                {`[${chapter + 1} / ${chapterCount + 1}]`}
              </span>
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
            >
              [next]
            </div>
            <div
              className="details__prev standard-link"
              onClick={() => this.handleRouteChange('prev')}
            >
              [prev]
            </div>
          </div>
        </div>
      </Swipeable>
    )
  }
};

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
  chapter: PropTypes.number.isRequired,
  chapterCount: PropTypes.number.isRequired,
  nextChapter: PropTypes.number.isRequired
};

export default withRouter(Details);
