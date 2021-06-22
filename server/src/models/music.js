const music = (sequelize, DataTypes) => {
  const Music = sequelize.define('music', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    clip: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
  });

  Music.associate = (models) => {
    Music.belongsTo(models.Release);
  };

  return Music;
};

export default music;
