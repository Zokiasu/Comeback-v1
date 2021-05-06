const release = (sequelize, DataTypes) => {
  const Release = sequelize.define('release', {
    name: {
      type: DataTypes.STRING,
      unique: false,
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
  });

  Release.associate = (models) => {
    Release.belongsToMany(models.Artist, {
      through: 'Release_Artist',
    });
  };

  return Release;
};

export default release;
