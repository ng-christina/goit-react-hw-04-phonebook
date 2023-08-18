import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Form from './Form/Form';
import style from './App.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newContact = { ...data, id: nanoid() };
    setContacts([...contacts, newContact]);
  };

  const onDeleteBtn = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
    setFilter('');
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={style.container}>
      <h1 className={style.title}>Phonebook</h1>
      <Form onFormSubmit={formSubmitHandler} contacts={contacts} />
      <h1 className={style.title}>Contacts</h1>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteBtn={onDeleteBtn} />
    </div>
  );
};

export default App;
