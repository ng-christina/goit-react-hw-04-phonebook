import style from './ContactItem.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const ContactItem = ({ name, number, onDeleteBtn }) => {
  return (
    <li className={style.item}>
      <span className={style.itemName}>{name}</span>
      <span className={style.itemNumber}>{number}</span>
      <button type="button" className={style.btnDelete} onClick={onDeleteBtn}>
        x
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteBtn: PropTypes.func.isRequired,
};
export default ContactItem;
