const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');

router.use('/users', userRoutes);
// router.use('/blogposts', blogPostRoutes);

module.exports = router;
