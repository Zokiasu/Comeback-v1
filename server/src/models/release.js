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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    styles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    Release.belongsToMany(models.Music, {
      through: 'Music_Release',
      as: 'musics',
    });
  };

  return Release;
};

export default release;
