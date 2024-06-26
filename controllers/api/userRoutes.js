const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      res.status(400).json({ message: 'Email or password is incorrect' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Email or password is incorrect' });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res
        .status(200)
        .json({ loggedIn: true, message: 'You are now logged in!' });
      console.log('Logged in!');
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res
        .status(200)
        .json({ loggedIn: true, message: 'Account created successfully!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
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
