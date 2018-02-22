import React from 'react';
import { withLastLocation } from 'react-router-last-location';
import { Grid } from 'Components/Grid';
import streamContent from 'Data/streamData';
import './streamView.scss';

/**
 * Renders the Content Stream top-level route component
 * Displays an <Grid /> component populated with `streamContent` data
 *
 * @param {object} props - props object
 * @param {object} match - ReactRouter `match` object
 *
 * @returns {ReactComponent} - Content Stream top-level route component
 */
const StreamView = ({ match, lastLocation }) => {
  const id = match.params.contentId
    ? Number(match.params.contentId)
    : null;
  let sectionClass = 'view view__stream';
  if (lastLocation) {
    sectionClass = lastLocation.pathname === '/'
      ? 'view view__stream view__stream--fade-in'
      : 'view view__stream';
  }

  return (
    <section className={sectionClass}>
      <Grid items={streamContent} activeItem={id} />
    </section>
  )
};

export default withLastLocation(StreamView);
