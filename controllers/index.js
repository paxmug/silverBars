const postHandler = require("./handlers/orderPostHandler");
const deleteHandler = require("./handlers/orderDeleteHandler");
const getHandler = require("./handlers/ordersGetHandler");

module.exports = function(app) {
    app.post("/api/order", postHandler.handle);
    app.delete("/api/order", deleteHandler.handle);
    app.get("/api/orders", getHandler.handle);
}
