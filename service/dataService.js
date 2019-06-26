const fs = require('fs');

const requireUncached = module => {
  delete require.cache[require.resolve(module)]
  return require(module)
};

const getData = key => {
  const db = requireUncached('../db/orders.json');
  return db[key];
}

const setData = (key, value) => {
  try {
    const db = requireUncached('../db/orders.json');
    const json = JSON.stringify({...db, [key]:value});
    fs.writeFile('db/orders.json', json, 'utf8', (res) => console.log(res));
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
    setData,
    getData
}