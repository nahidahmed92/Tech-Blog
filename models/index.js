const User = require('./User.js');
const BlogPost = require('./BlogPost.js');
const Comment = require('./Comment.js');

User.hasMany(BlogPost, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogId',
});

module.exports = { BlogPost, Comment, User };
