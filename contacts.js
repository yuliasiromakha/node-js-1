const path = require("path");
const fs = require("fs").promises; 
const { nanoid } = require("nanoid"); 

const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
    return fs.readFile(contactsPath, "utf-8")
        .then(data => JSON.parse(data));
}

function getContactById(id) {
    return listContacts()
        .then(contacts => {
            const contactId = String(id);
            const result = contacts.find(item => item.id === contactId);
            return result || null;
        });
}

function removeContact(contactId) {
    return listContacts()
        .then(contacts => {
            const index = contacts.findIndex(item => item.id === contactId);
            if (index === -1) {
                return null;
            }
            const [result] = contacts.splice(index, 1);
            return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
                .then(() => result);
        });
}

function addContact(name, email, phone) {
    return listContacts()
        .then(contactsData => {
            const newContact = {
                "id": nanoid(),
                "name": name,
                "email": email,
                "phone": phone,
            };
            contactsData.push(newContact);
            return fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2))
                .then(() => newContact);
        });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
