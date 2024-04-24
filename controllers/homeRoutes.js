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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log(req.session.userId, ', ', req.session.username);
    // Get all post and JOIN with user data with id and username
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
      where: {
        userId: req.session.userId,
      },
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

router.get('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
      where: {
        userId: req.session.userId,
      },
    });

    if (!blogPostData) {
      // If the blog post doesn't exist or doesn't belong to the current user
      return res.redirect('/login'); // Redirect to login page
    }

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
