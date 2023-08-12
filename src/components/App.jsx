import React, { Component } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Form from './Form/Form';
import style from './App.module.css';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // Завантаження контактів з localStorage при запуску застосунку
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Збереження контактів у localStorage при зміні стану контактів
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const newContact = { ...data, id: nanoid() };
    this.setState({ contacts: [...contacts, newContact] });
  };
  onDeleteBtn = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  changeFilter = e => {
    this.setState({ ...this.state, filter: e.target.value });
  };
  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={style.container}>
        <h1 className={style.title}>Phonebook</h1>
        <Form onFormSubmit={this.formSubmitHandler} contacts={contacts} />
        <h1 className={style.title}>Contacts</h1>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteBtn={this.onDeleteBtn}
        />
      </div>
    );
  }
}
