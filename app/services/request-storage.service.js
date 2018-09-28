import idb from 'idb';

const dbPromise = idb.open('rerc', 1, upgradeDB => {
  upgradeDB.createObjectStore('requests');
})

const set = (time, url, config) => {
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


const getAll = () => {
  // todo: get all for now. upgrade to use cursor to get 10 later
  return dbPromise.then(db => {
    return db.transaction('requests')
      .objectStore('requests').getAll();
  }).then(allObjs => allObjs);
}

const getAllExt = (options = {}) => {
  let defaults = {
    sort: "prev",
    limit: 25
  }

  let optionsWithDefaults = Object.assign({}, defaults, options);

  return dbPromise.then(db => {
    const tx = db.transaction('requests');

    let list = [];
    let i = 0;

    tx.objectStore('requests').iterateCursor(null, optionsWithDefaults.sort, cursor => {
      if (!cursor || i >= optionsWithDefaults.limit) return;
      const row = {
        key: cursor.key,
        value: cursor.value
      }
      list.push(row);
      i++;
      cursor.continue();
    });


    return tx.complete.then(() => {
      return list;
    });
  })
}

export { set, getAll, getAllExt };