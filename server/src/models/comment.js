const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: true,
      defaultValue: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User);

    Comment.hasMany(models.Comment, {
      as: 'answers',
      foreignKey: 'parentId'
    });
  };

  return Comment;
};

export default comment;
