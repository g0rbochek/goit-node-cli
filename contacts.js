import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

// Складання шляху до файлу contacts.json
const contactsPath = path.resolve("db", "contacts.json");

// Функція яка повертає список усіх контактів, в utf-8 форматі(Загально прийнятий формат)
// Повертаємо це все обʼєктом
export async function listContacts() {
 const contacts = await fs.readFile(contactsPath, "utf-8");
 return JSON.parse(contacts);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export async function getContactById(contactId) {
 const contacts = await listContacts();
 const contact = contacts.find((item) => item.id === contactId);
 return contact || null;
}

// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export async function removeContact(contactId) {
 const contacts = await listContacts();
 const index = contacts.findIndex((contact) => contact.id === contactId);
 if (index === -1) {
  return null;
 }
 const [result] = contacts.splice(index, 1);
 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

 return result;
}

// ...твій код. Повертає об'єкт доданого контакту (з id).
export async function addContact(name, email, phone) {
 const contacts = await listContacts();
 const id = nanoid();
 const newContact = { id: nanoid(), name, email, phone };
 contacts.push(newContact);

 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

 return newContact;
}
