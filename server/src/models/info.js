const info = (sequelize, DataTypes) => {
  const Info = sequelize.define('info', {
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
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      unique: false,
      allowNull: true,
    },
  });

  Info.associate = (models) => {
    Info.belongsTo(models.User);
    Info.belongsTo(models.Artist);
  };

  return Info;
};

export default info;