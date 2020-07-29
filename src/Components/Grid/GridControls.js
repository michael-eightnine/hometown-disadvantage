import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PREVIOUS, NEXT } from 'Data';

/**
 * Navigation/control component that displays in the `Grid` component. Provides an absolute positioned UI box
 * that displays the current chapter title and previous/next buttons. Buttons are only enabled if the user
 * can navigate in that direction (ex: the last chapter has the "next" button disabled)
 *
 * @param {object} props - react props
 * @param {number} props.chapter - the index of the current chapter within the streamContent object
 * @param {number} props.chapterMax - the max number of chapters that can be navigated to
 * @param {string} props.chapterTitle - the title of the current chapter being viewed in the grid
 * @param {object} props.history - react router provided history object
 *
 * @returns {ReactComponent} - grid control markup
 */
class GridControls extends PureComponent {
  handleChapterChange = direction => {
    const { chapter, history } = this.props;

    let newRoute;
    switch (direction) {
      case NEXT:
        newRoute = `/content-stream/${chapter + 1}`;
        break;
      case PREVIOUS:
        newRoute = `/content-stream/${chapter - 1}`;
        break;
      default:
        newRoute = '/content-stream/0';
    }
    history.push(newRoute);
  };

  render() {
    const { chapterTitle, chapterMax, chapter } = this.props;
    const atStart = chapter === 0;
    const atEnd = chapter === chapterMax;

    return (
      <div className="grid__controls">
        <div className="grid__chapter-title">{chapterTitle}</div>
        <div className="grid__prev">
          <button
            onClick={() => this.handleChapterChange(PREVIOUS)}
            disabled={atStart}
            className="standard-link unstyled-button"
          >
            [prev]
          </button>
        </div>
        <div className="grid__next">
          <button
            onClick={() => this.handleChapterChange(NEXT)}
            disabled={atEnd}
            className="standard-link unstyled-button"
          >
            [next]
          </button>
        </div>
      </div>
    );
  }
}

GridControls.defaultProps = {
  chapter: PropTypes.number.isRequired,
  chapterMax: PropTypes.number.isRequired,
  chapterTitle: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(GridControls);
