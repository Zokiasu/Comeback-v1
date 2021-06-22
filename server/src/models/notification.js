import { NOTIFICATION_TYPE } from '../constants';

const notification = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(
        NOTIFICATION_TYPE.ARTIST,
        NOTIFICATION_TYPE.COMMENT,
        NOTIFICATION_TYPE.GENERAL,
        NOTIFICATION_TYPE.RELEASE,
      ),
      unique: false,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(1000),
      unique: false,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(2000),
      unique: false,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
  });

  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      through: models.UserNotification,
    });
  };

  return Notification;
};

export default notification;