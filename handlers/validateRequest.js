exports.validateContentType = (req, res, next) => {
    const contentType = req.get("Content-Type");
    if ("application/json" !== contentType) {
        console.error("Incorrect content type supplied: " + contentType);
        res.status(415).json({
            status: 415,
            message: "Wrong Content-Type. Only application/json is supported"
        });
        return;
    }
    next();
}