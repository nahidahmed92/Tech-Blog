const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
  try {
    // retrieve blog post ID from request parameters
    const blogPostId = req.params.id;

    // retrieve comment data from request body
    const { comment } = req.body;

    // create the comment in the database
    const newComment = await Comment.create({
      comment: req.body.comment,
      blogId: blogPostId,
      userId: req.session.userId,
    });

    // redirect or send a response
    res.redirect(`/blogs/${blogPostId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    // redirect or send a response
    res.redirect(`/blogs/${blogPostId}/`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
