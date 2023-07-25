import { useState, useEffect } from 'react';
import contactList from './data/contacts.json';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Title } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState();
  const [filter, setFilter] = useState('');

  const ADDED_CONTACTS = 'addedContacts';


  useEffect(() => {
    let savedContacts = localStorage.getItem(ADDED_CONTACTS);
    if (savedContacts) {
      savedContacts = JSON.parse(savedContacts);
      setContacts(savedContacts);
    } else {
      setContacts(contactList)
    }
  }, []);

  useEffect(() => {
    if(contacts) {
    localStorage.setItem (ADDED_CONTACTS, JSON.stringify(contacts))
    }
  }, [contacts])

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleAdd = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts([newContact, ...contacts]);
      // localStorage.setItem (ADDED_CONTACTS, JSON.stringify([newContact, ...contacts]))
    }
  };

  const onDeleteContact = id => {
    let indexToDelete = contacts.findIndex(contact => contact.id === id);
    let newContacts = contacts;
    newContacts.splice(indexToDelete, 1);
    // localStorage.setItem (ADDED_CONTACTS, JSON.stringify(newContacts))
    setContacts([...newContacts]); 
    // without ... React will not rerender component 
  };

  return (
    <div>
      <Title>Phonebook</Title>
      <ContactForm handleAdd={handleAdd} />

      <Title>Contacts</Title>
      <Filter
        handleFilterChange={handleFilterChange}
        value={filter}
      />
      {contacts && <ContactList
        list={contacts.filter(user =>
          user.name.toLowerCase().includes(filter.toLowerCase())
        )}
        onDeleteContact={onDeleteContact}
      />}
    </div>
  );
}

// class App extends Component {
//   state = {
//     contacts: contacts,
//     filter: '',
//   };

//   handleFilterChange = e => {
//     this.setState({ filter: e.target.value });
//   };

//   componentDidMount() {
//     let savedContacts = localStorage.getItem(ADDED_CONTACTS)
//     if (savedContacts) {
//       savedContacts = JSON.parse(savedContacts);
//       this.setState({ contacts: savedContacts})
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if(prevState.contacts !== this.state.contacts) {
//       localStorage.setItem (ADDED_CONTACTS, JSON.stringify(this.state.contacts))
//     }
//   }

//   handleAdd = newContact => {
//     if(this.state.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
//       alert(`${newContact.name} is already in contacts`)
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [newContact, ...contacts],
//       }));
//     }
//   }

//   onDeleteContact = id => {
//     let indexToDelete = this.state.contacts.findIndex(contact => contact.id === id)
//     let newContacts = this.state.contacts
//     newContacts.splice((indexToDelete), 1)
//     this.setState({contacts: [...newContacts]})
//   }

//   render() {
//     return (
//       <div>
//         <Title>Phonebook</Title>
//          <ContactForm handleAdd={this.handleAdd}/>

//         <Title>Contacts</Title>
//         <Filter handleFilterChange={this.handleFilterChange} value={this.state.filter}/>
//         <ContactList list={this.state.contacts
//             .filter(user =>
//               user.name.toLowerCase().includes(this.state.filter.toLowerCase())
//             )}
//             onDeleteContact={this.onDeleteContact}/>
//       </div>
//     );
//   }
// }

// export default App;
