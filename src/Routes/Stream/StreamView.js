import React from 'react';
import { Grid } from 'Components/Grid';
import streamContent from 'Data/streamData';

/**
 * Renders the Content Stream top-level route component
 * Displays an <Grid /> component populated with `streamContent` data
 *
 * @param {object} props - props object
 * @param {object} match - ReactRouter `match` object
 *
 * @returns {ReactComponent} - Content Stream top-level route component
 */
const StreamView = ({ match }) => {
  const id = match.params.contentId
    ? Number(match.params.contentId)
    : null;

  return (
    <section className="view view__stream">
      <Grid items={streamContent} activeItem={id} />
    </section>
  )
};

export default StreamView;
