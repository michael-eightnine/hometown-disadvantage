import React from "react";
import PropTypes from "prop-types";
import { Grid } from "Components/Grid";
import { streamData } from "Data";

/**
 * Renders the Content Stream top-level route component
 * Displays a <Grid /> component populated with `streamData` data for the current chapter
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
      chapterMax={streamData.length - 1}
      chapterTitle={streamData[chapterId].meta.title}
      items={streamData[chapterId].content}
    />
  </section>
);

StreamView.propTypes = {
  chapterId: PropTypes.number.isRequired
};

export default StreamView;
