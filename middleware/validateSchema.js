var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse(req.body);
            next();
        }
        catch (e) {
            return res.status(400).send(e.errors);
        }
    };
};
export default validate;
