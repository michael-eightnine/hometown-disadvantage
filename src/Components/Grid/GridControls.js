import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class GridControls extends Component {
  handleChapterChange = (direction) => {
    const {
      chapter,
      chapterMax,
      history
    } = this.props;
    const atStart = chapter === 0;
    const atEnd = chapter === chapterMax;
    // If we're at the starting or ending chapter and moving in that direction, do nothing
    if ((direction === 'prev' && atStart) || (direction === 'next' && atEnd))
      return;

    let newRoute;
    switch (direction) {
      case 'next':
        newRoute = `/content-stream/${chapter + 1}`
        break;
      case 'prev':
        newRoute = `/content-stream/${chapter - 1}`
        break;
      default:
        newRoute = '/content-stream/0'
    };
    history.push(newRoute);
  }

  render() {
    const { chapterTitle, chapterMax, chapter } = this.props;
    const atStart = chapter === 0;
    const atEnd = chapter === chapterMax;

    return (
      <div className="grid__controls">
        <div className="grid__chapter-title">{chapterTitle}</div>
        <div className="grid__prev">
          <span
            onClick={() => this.handleChapterChange('prev')}
            disabled={atStart}
            className="standard-link">
            [prev]
          </span>
        </div>
        <div className="grid__next">
          <span
            onClick={() => this.handleChapterChange('next')}
            disabled={atEnd}
            className="standard-link">
            [next]
          </span>
        </div>
      </div>
    )
  }
}

GridControls.defaultProps = {
  chapter: PropTypes.number.isRequired,
  chapterMax: PropTypes.number.isRequired,
  chapterTitle: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(GridControls);
