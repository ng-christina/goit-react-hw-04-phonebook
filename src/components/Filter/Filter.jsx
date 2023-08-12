import style from './filter.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({ value, onChange }) => (
  <div className={style.searchContainer}>
    <label className={style.search}>
      <input
        type="text"
        name="filter"
        placeholder="Search"
        className={style.inputName}
        title="Enter search name"
        onChange={onChange}
        value={value}
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
