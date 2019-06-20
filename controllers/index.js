const orderHandler = require("./handlers/orderPostHandler");

module.exports = function(app) {
    app.post("/api/order", orderHandler.handle);
}
