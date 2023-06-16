const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    // if (req.url === '/registration' || req.url === '/login') {
    //     next();
    //     return;
    // }

    const accessToken = req.headers['authorization'];
    if (accessToken) {
        const decoded = jwt.verify(accessToken, '12345', (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send({ message: 'Invalid Signature' });
            } else {
                console.log(decoded);
                next();
            }
        });

    } else {
        res.status(401).send({ message: 'Unauthorization request' })
    }
};





