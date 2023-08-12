import style from './ContactList.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, onDeleteBtn }) => (
  <ul className={style.conList}>
    {contacts.map(({ id, name, number }) => (
      <ContactItem
        key={id}
        name={name}
        number={number}
        onDeleteBtn={() => onDeleteBtn(id)}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
  onDeleteBtn: PropTypes.func.isRequired,
};
export default ContactList;
