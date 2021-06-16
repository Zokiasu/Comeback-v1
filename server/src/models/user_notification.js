const userNotification = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('user_notification', {
    unread: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: true,
      defaultValue: true,
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
  });
  return UserNotification;
};

export default userNotification;
