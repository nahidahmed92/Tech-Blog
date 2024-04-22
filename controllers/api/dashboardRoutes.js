const router = require('express').Router();
const { BlogPost, User } = require('../../models');

// this should be a post route
// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const blogPostData = await BlogPost.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const blogs = blogPostData.map((blog) => blog.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('dashboard', {
//       blogs,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
