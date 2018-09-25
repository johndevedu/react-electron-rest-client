import idb from 'idb';

const dbPromise = idb.open('rerc', 1, upgradeDB => {
  upgradeDB.createObjectStore('requests');
})

const setRequest = (time, url, config) => {
  const value = {
    url, config
  }
  // set(time, value, requestStore);
  dbPromise.then(db => {
    const tx = db.transaction('requests', 'readwrite');
    // todo: improve with using guid
    tx.objectStore('requests').put(value, time);

    return tx.complete;
  });
}

const getRequests = () => {
  // todo: get all for now. upgrade to use cursor to get 10 later
  return dbPromise.then(db => {
    return db.transaction('requests')
      .objectStore('requests').getAll();
  }).then(allObjs => allObjs);
}

export { setRequest as set, getRequests as getAll };