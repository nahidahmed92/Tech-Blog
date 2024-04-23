const router = require('express').Router();
const { BlogPost, User } = require('../../models');

// this should be a post route
router.post('/', async (req, res) => {
  try {
    // post blog and
    const blogPostData = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
