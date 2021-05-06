const artist = (sequelize, DataTypes) => {
  const Artist = sequelize.define('artist', {
    name: {
      type: DataTypes.STRING,
      unique: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    socials: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });

  Artist.associate = (models) => {
    Artist.belongsToMany(models.User, {
      through: 'User_Artist',
      as: 'followers',
    });

    Artist.belongsToMany(models.Artist, {
      through: 'Artist_Artist',
      as: 'groups',
      foreignKey: 'groupId',
    });

    Artist.belongsToMany(models.Artist, {
      through: 'Artist_Artist',
      as: 'members',
      foreignKey: 'memberId',
    });

    Artist.belongsToMany(models.Release, {
      through: 'Release_Artist',
    });
  };

  return Artist;
};

export default artist;
