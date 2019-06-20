const postHandler = require("./handlers/orderPostHandler");
const deleteHandler = require("./handlers/orderDeleteHandler");

module.exports = function(app) {
    app.post("/api/order", postHandler.handle);
    app.delete("/api/order", deleteHandler.handle);
}
