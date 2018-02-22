import React from 'react';
import PropTypes from 'prop-types';
import { withLastLocation } from 'react-router-last-location';
import { Details } from 'Components/Details';
import streamContent from 'Data/streamData';
import './detailView.scss';

/**
 * Renders the detail view of a single grid item
 * View data is retrieved from `streamData` using `activeId` (a <Route> prop)
 * Prev/next item indexes are determined for use by the navigation buttons within `<Details>`
 * Additionally, depending on the `lastLocation`, a transition class is added for CSS animation
 *
 * @param {object} props - props object
 * @param {number} props.activeId - the currently selected item's index, via route render method & `match`
 * @param {object} props.lastLocation - describes the previous route the user came to this view from
 *
 * @returns {ReactComponent} - Detail View top-level route component
 */
const DetailView = ({ activeId, lastLocation }) => {
  let sectionClass = 'view view__stream';
  if (lastLocation) {
    sectionClass = lastLocation.pathname === '/'
      ? 'view view__detail view__detail--fade-in'
      : 'view view__detail';
  }

  const count = streamContent.length - 1;
  const nextItem = activeId === count ? 0 : activeId + 1;
  const prevItem = activeId === 0 ? count : activeId - 1;

  return (
    <section className={sectionClass}>
      <Details
        item={streamContent[activeId]}
        count={count}
        current={activeId}
        prevItem={prevItem}
        nextItem={nextItem}
      />
    </section>
  )
};

DetailView.propTypes = {
  activeId: PropTypes.number.isRequired,
  lastLocation: PropTypes.object
};

export default withLastLocation(DetailView);
