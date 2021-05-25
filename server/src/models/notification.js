import { NOTIFICATION_TYPE } from '../constants';

const notification = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
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
    message: {
      type: DataTypes.STRING(1000),
      unique: false,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(1000),
      unique: false,
      allowNull: true,
    },
    unread: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: true,
      defaultValue: true,
    },
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User);
  };

  return Notification;
};

export default notification;
