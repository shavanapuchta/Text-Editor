import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to add a method that accepts some content and then adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add(content);
    await tx.complete;
    console.log('Conent added to database', content);
  } catch (err) {
    console.error('Error: Could not add content to database', error);
  }
};

// Logic to add a method that gets all the content from the database
export const getDb = async () => {
    try {
        const db = await initdb();
        const tx = db.transaction('jate', 'readonly');
        const store = tx.objectStore('jate');
        const allContent = await store.getAll();
        await tx.complete;
        console.log('Content retreived from database:', allContent);
        return allContent;
    } catch (err) {
        console.error('Error: Could not retrieve content from database:', err);
        return[];
    }
};

console.error('getDb not implemented');

initdb();