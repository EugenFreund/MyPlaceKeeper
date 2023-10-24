const router = require("express").Router();

const authRoutes = require('./auth.routes')
router.use('/auth', authRoutes)

const pinsRoutes = require('./pins.routes')
router.use('/pins', pinsRoutes)

module.exports = router;
