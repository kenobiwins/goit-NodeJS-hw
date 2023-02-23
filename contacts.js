const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getContactById(contactId) {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    const contactById = data.find((elem) => elem.id === Number(contactId));

    return { ...contactById };
  } catch (e) {
    console.log(e);
  }
}

async function removeContact(contactId) {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    const filteredData = data.filter(
      (contact) => contact.id !== Number(contactId)
    );

    writeContactsToDB(filteredData);
    return filteredData;
  } catch (e) {
    console.log(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await getParsedDataFromFile(contactsPath);
    const user = {
      name,
      email,
      phone,
      id: Number(data[data.length - 1].id) + 1,
    };

    writeContactsToDB([...data, user]);
    return { ...user };
  } catch (e) {
    console.log(e);
  }
}

async function getParsedDataFromFile(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeContactsToDB(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
