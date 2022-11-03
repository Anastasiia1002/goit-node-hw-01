const fs = require("node:fs").promises;
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./myapp/db/contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    contacts.map((contact) => {
      if (contact.id == contactId) console.table(contact);
    });
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id == contactId);
    contacts.splice(index, 1);
    const contactsList = JSON.stringify([...contacts], null, "\t");
    fs.writeFile(contactsPath, contactsList, "utf8");

    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
  fs.writeFile(contactsPath, contactsList, "utf8");
  console.table(contacts);
};

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
};
