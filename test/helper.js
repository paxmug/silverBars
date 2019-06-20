const fs = require('fs');

const resetDataBase = () => {
  try {
      const initialData = {
          "currency": "GBP",
          "metric": "Kg",
          "board": []
      };
    var json = JSON.stringify(initialData);
      fs.writeFile('db/orders.json', json, 'utf8', (res) => console.log(res));
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
    resetDataBase
}