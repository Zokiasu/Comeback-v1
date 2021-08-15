import { ROLES, SUBSCRIPTION} from '../constants';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    // id is exceptionnaly a string since we get the id from firebase as a string
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

    subscription: {
      type: DataTypes.ENUM(SUBSCRIPTION.REGULAR, SUBSCRIPTION.SUBSCRIBER, SUBSCRIPTION.VIP),
      defaultValue: SUBSCRIPTION.REGULAR,
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
    User.belongsToMany(models.Release, {
      through: 'User_Release',
    });
    User.belongsToMany(models.Notification, {
      through: models.UserNotification,
    });

    User.hasMany(models.Request);
    User.hasMany(models.Info);
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
