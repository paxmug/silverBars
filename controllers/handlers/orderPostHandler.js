handle = async (req, res, next) => {
    const {
        userId,
        quantity,
        price,
        type
    } = req.body;

    if (userId && quantity && price && type) {
        console.log('invalid input');
    } else {
        const err = new Error("Invalid Request");
        err.status = 400;
        return next(err);
    }
};
module.exports = {
    handle
}