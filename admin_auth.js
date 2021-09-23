const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const vaild = jwt.verify(req.headers.authorization, "mohammadfarghalyalisaadawyfarghalysaeedfarghaly");
    if(vaild) next();
    else res.json({done: flase, error: "Your are not authorized..."});
}