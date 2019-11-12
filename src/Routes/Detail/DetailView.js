import React from "react";
import PropTypes from "prop-types";
import { withLastLocation } from "react-router-last-location";
import { Details } from "Components/Details";
import { streamData } from "Data";
import "./detailView.scss";

/**
 * Renders the detail view of a single grid item
 * View data is retrieved from `streamData` using `chapterId` and `contentId` (<Route> props)
 * Prev/next item indexes are determined for use by the navigation buttons within `<Details>`
 * Prev/next chapter indexes are determined for use by the navigation buttons within `<Details>`
 * Additionally, depending on the `lastLocation`, a transition class is added for CSS animation
 *
 * @param {object} props - props object
 * @param {number} props.chapterId - the currently selected chapter (page) of content
 * @param {number} props.contentId - the currently selected content item's index
 * @param {object} props.lastLocation - describes the previous route the user came to this view from
 *
 * @returns {ReactComponent} - Detail View top-level route component
 */
const DetailView = ({ chapterId, contentId, lastLocation }) => {
  let sectionClass = "view view__stream";
  if (lastLocation) {
    sectionClass =
      lastLocation.pathname === "/"
        ? "view view__detail view__detail--fade-in"
        : "view view__detail";
  }

  // Determine chapter content
  const chapterContent = streamData[chapterId].content;
  // Determine item count, next item, and previous item
  const count = chapterContent.length - 1;
  const nextItem = contentId === count ? 0 : contentId + 1;
  const prevItem = contentId === 0 ? count : contentId - 1;

  return (
    <section className={sectionClass}>
      <Details
        item={chapterContent[contentId]}
        count={count}
        current={contentId}
        prevItem={prevItem}
        nextItem={nextItem}
        chapter={chapterId}
      />
    </section>
  );
};

DetailView.propTypes = {
  chapterId: PropTypes.number.isRequired,
  contentId: PropTypes.number.isRequired,
  lastLocation: PropTypes.object
};

export default withLastLocation(DetailView);
