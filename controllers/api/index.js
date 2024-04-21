const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/users', userRoutes);
// router.use('/blogposts', blogPostRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
