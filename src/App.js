import React, { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm/contactForm';
import ContactList from './components/ContactList/contactList';
import Filter from './components/Filter/filter';



class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    }
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`)
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
 
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };
  
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();


    return (
      <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact}/>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
      </>
    );
  }
}


export default App;
