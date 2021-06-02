import { ROLES } from '../constants';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },

    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
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
    User.hasMany(models.Notification, { onDelete: 'cascade' });

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
