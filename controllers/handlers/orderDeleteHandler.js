const fs = require('fs');
const orders = require('../../db/orders');

handle = async (req, res, next) => {
    const {
        userId,
        quantity,
        pricePerKg,
        type
    } = req.body;
    if (userId && quantity && pricePerKg && type) {
        const { board } = orders;
        const toDelete = { userId, quantity, pricePerKg, type };
        const newDataSet = JSON.stringify({...orders, board: board.filter( order => _.isEqual(order, toDelete))});
        fs.writeFile('db/orders.json', newDataSet, 'utf8', (res) => console.log(res));
        res.json("Order Deleted");
    } else {
        const err = new Error("Invalid Request");
        err.status = 400;
        return next(err);
    }
};
module.exports = {
    handle
}