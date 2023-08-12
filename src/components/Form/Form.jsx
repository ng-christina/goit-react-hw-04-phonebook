import style from './Form.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'number' && !/^[0-9\s-+()]*$/.test(value)) {
      alert('Enter only numbers, spaces and symbols');
      return;
    }
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.reset();

    const isNameExist = this.props.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.props.onFormSubmit({ name, number });
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.form}>
        <label className={style.label}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={style.input}
          value={name}
          onChange={this.handleChange}
        />
        <label className={style.label}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={style.input}
          value={number}
          onChange={this.handleChange}
        />
        <button className={style.button} type="submit">
          ADD CONTACT
        </button>
      </form>
    );
  }
}

Form.propType = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
};
export default Form;
