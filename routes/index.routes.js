const router = require("express").Router();

const authRoutes = require('./auth.routes')
router.use('/auth', authRoutes)

const pinsRoutes = require('./pins.routes')
router.use('/pins', pinsRoutes)

const pinCollectionsRoutes = require('./pincollections.routes')
router.use('/pincollection', pinCollectionsRoutes)

module.exports = router;
