const music = (sequelize, DataTypes) => {
  const Music = sequelize.define('music', {
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
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });

  Music.associate = (models) => {
    Music.belongsToMany(models.Release, {
      through: 'Music_Release',
    });
    Music.belongsToMany(models.Artist, {
      through: 'Music_Artist',
    });
  };

  return Music;
};

export default music;
