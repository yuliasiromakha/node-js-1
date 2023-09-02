// index.js
console.log('index.js file is started');
// const contacts = require('./db/contacts.json'); 
const contacts = require('./contacts.js')
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const allContacts = contacts.listContacts();
        return console.log(allContacts);
      break;

    case 'get':
        const oneContact = contacts.getContactById(id);
        return console.log(oneContact);
      break;

    case 'add':
        const newContact = contacts.addContact(name, email, phone);
        return console.log(newContact);
      break;

    case 'remove':
        const deleteContact = contacts.removeContact(id);
        return console.log(deleteContact); 
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);