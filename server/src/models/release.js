const release = (sequelize, DataTypes) => {
  const Release = sequelize.define('release', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('ALBUM', 'EP', 'SINGLE'),
      unique: false,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING(2000)),
      allowNull: true,
    },
  });

  Release.associate = (models) => {
    Release.belongsToMany(models.User, {
      through: 'User_Release',
      as: 'followers',
    });
    Release.belongsToMany(models.Artist, {
      through: 'Release_Artist',
    });
    Release.hasMany(models.Music, {
      as: 'musics',
      onDelete: 'CASCADE',
    });

    Release.belongsToMany(models.Happening, {
      through: 'Happening_Release',
      as: 'events',
    });
    Release.belongsToMany(models.Style, {
      through: 'Release_Style',
    });
  };

  return Release;
};

export default release;
