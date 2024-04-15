const User = require('./User.js');
const BlogPost = require('./BlogPost.js');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, BlogPost };
