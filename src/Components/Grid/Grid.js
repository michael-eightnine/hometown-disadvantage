import React from 'react';
import PropTypes from 'prop-types';
import { GridItem } from './';
import './grid.scss';

/**
 * Top-level component for the Grid, implements all sub components
 * Handles the details view/modal visibility and active item via container props
 *
 * @param {object} props - props object
 * @param {number} props.chapter - the current chapter of items to display
 * @param {object[]} props.items - array of items to display in the grid
 *
 * @returns {ReactComponent} - the Grid component
 */
const Grid = ({ chapter, items }) => (
  <section className="grid">
    <div className="grid__list">
      {items.map((item, i) => (
        <GridItem
          key={item.image}
          image={item.image}
          to={`${chapter}/${i}`}
        />
      ))}
    </div>
  </section>
);

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  chapter: PropTypes.number.isRequired
};

export default Grid;
