import React from 'react';
import PropTypes from 'prop-types';
import { GridItem, GridDetails } from './';
import './grid.scss';

/**
 * Top-level component for the Grid, implements all sub components
 * Handles the details view/modal visibility and active item via container props
 *
 * @param {object} props - props object
 * @param {object[]} props.items - array of items to display in the grid
 * @param {number} props.activeItem - optional prop which triggers the `GridDetails` modal
 *
 * @returns {ReactComponent} - the Grid component
 */
const Grid = ({ items, activeItem }) => {
  const selectedGridItem = activeItem !== null ? items[activeItem] : null;
  const count = items.length - 1;
  const nextItem = activeItem === count ? 0 : activeItem + 1;
  const prevItem = activeItem === 0 ? count : activeItem - 1;

  return (
    <section className="grid">
      <div className="grid__list">
        {items.map((item, i) => (
          <GridItem
            key={item.image}
            image={item.image}
            to={i}
          />
        ))}
      </div>
      {selectedGridItem &&
        <GridDetails
          item={selectedGridItem}
          count={count}
          current={activeItem}
          prevItem={prevItem}
          nextItem={nextItem}
        />
      }
    </section>
  )
}

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.number
}

export default Grid;
