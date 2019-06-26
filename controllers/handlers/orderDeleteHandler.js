const {getData, setData} = require('../../service/dataService');
const  _ = require('lodash');

handle = async (req, res, next) => {
    const { userId, quantity, pricePerKg, type } = req.body;

    if (userId && quantity && pricePerKg && type) {
        const board  = getData('board') || [];
        const toDelete = { userId, quantity, pricePerKg, type };
        const newBoard = board && board.filter( order => !_.isEqual(order, toDelete));
        setData('board', newBoard);
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