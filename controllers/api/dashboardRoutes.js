const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

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

router.put('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Find the blog post to be deleted
    const blogPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({
      message: 'Posts and associated Comments have been deleted.',
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
