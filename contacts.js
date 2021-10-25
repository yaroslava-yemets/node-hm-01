const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, '.', 'db', 'contacts.json');

const getData = async () => {
    const result = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(result);
};

async function listContacts () {
    return await getData();
};
  
async function getContactById (contactId) {
    const contacts = await getData();
    const [result] = contacts.filter(contact => contact.id === contactId);
    return result;
};
  
async function removeContact (contactId) {
    const contacts = await getData();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    if(filteredContacts.length === 0) {
        return
    }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
};
  
async function addContact (name, email, phone) {
    const contacts = await getData();
    newContact = { id: crypto.randomUUID(), name, email, phone}
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}