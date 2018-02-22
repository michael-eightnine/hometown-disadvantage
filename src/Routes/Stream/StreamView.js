import React from 'react';
import { Grid } from 'Components/Grid';
import streamContent from 'Data/streamData';

/**
 * Renders the Content Stream top-level route component
 * Displays an <Grid /> component populated with `streamContent` data
 *
 * @returns {ReactComponent} - Content Stream top-level route component
 */
const StreamView = () => (
  <section className="view view__stream">
    <Grid items={streamContent} />
  </section>
);

export default StreamView;
