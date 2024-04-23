const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogPostData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      username: req.session.username
        ? req.session.username.toUpperCase()
        : 'Guest',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogs = blogPostData.get({ plain: true });

    res.render('blogs', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogPostData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    const blogs = blogPostData.get({ plain: true });
    res.render('dashboard-edit', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } else {
    res.render('signup');
  }
});

router.get('/blogs', (req, res) => {
  res.redirect('/');
  return;
});

module.exports = router;
