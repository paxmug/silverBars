const {getData, setData} = require('../../service/dataService');

handle = async (req, res, next) => {
    const { userId, quantity, pricePerKg, type } = req.body;

    if (userId && quantity && pricePerKg && type) {        
        const newOrder = { userId, quantity, pricePerKg, type };

        const board  = getData('board') || [];
        const newBoard = [...board, newOrder];
        
        setData('board', newBoard);
        res.json("Order Created");
    } else {
        const err = new Error("Invalid Request");
        err.status = 400;
        return next(err);
    }
};
module.exports = {
    handle
}