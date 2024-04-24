const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
