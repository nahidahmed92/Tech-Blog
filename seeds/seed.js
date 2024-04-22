const sequelize = require('../config/connection.js');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const createdBlogPosts = [];

  for (const blogPost of blogPostData) {
    const createdBlogPost = await BlogPost.create({
      ...blogPost,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
    createdBlogPosts.push(createdBlogPost);
  }

  // Create Comments at random
  for (const comment of commentData) {
    // Get a random users `id`
    const { id: randomUserId } =
      users[Math.floor(Math.random() * users.length)];
    const randomBlogPost =
      createdBlogPosts[Math.floor(Math.random() * createdBlogPosts.length)];
    const randomBlogPostId = randomBlogPost.id;

    // Create a new comment with random `userId` and `blogId` values
    await Comment.create({
      ...comment,
      userId: randomUserId,
      blogId: randomBlogPostId,
    }).catch((err) => {
      console.log(err);
    });
  }
  process.exit(0);
};

seedDB();
