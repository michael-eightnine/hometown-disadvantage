import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'Components/Grid';
import streamContent from 'Data/streamData';

/**
 * Renders the Content Stream top-level route component
 * Displays an <Grid /> component populated with `streamContent` data for the current chapter
 *
 * @param {object} props - props object
 * @param {number} props.chapterId - the current chapter of content to display
 *
 * @returns {ReactComponent} - Content Stream top-level route component
 */
const StreamView = ({ chapterId }) => (
  <section className="view view__stream">
    <Grid
      chapter={chapterId}
      chapterMax={streamContent.length - 1}
      chapterTitle={streamContent[chapterId].meta.title}
      items={streamContent[chapterId].content}
    />
  </section>
);

StreamView.propTypes = {
  chapterId: PropTypes.number.isRequired
};

export default StreamView;
