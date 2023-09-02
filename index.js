console.log('index.js file is started');
const contacts = require('./contacts.js')
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      try {
        const oneContact = await contacts.getContactById(id);
        if (oneContact) {
          console.log(oneContact);
        } else {
          console.log("Contact not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      if (deleteContact) {
        console.log(deleteContact);
      } else {
        console.log("Contact not found");
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);