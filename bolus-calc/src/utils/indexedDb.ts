export async function saveSettings(data: any) {
  const request = indexedDB.open('Bolusrechner-mmol');

  request.onsuccess = function () {
    const db = request.result;
    const tx = db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    store.put({ ...data, id: 'unique_key' });
  };
}
