import { ROLES } from '../constants';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.MODERATOR, ROLES.NONE),
    },

    avatar: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Artist, {
      through: 'User_Artist',
    });

    User.hasMany(models.Request);
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    return user;
  };

  return User;
};

export default user;
