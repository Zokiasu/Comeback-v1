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
    Artist.belongsTo(models.User);
  };

  /* Artist.associate = (models) => {
    Artist.hasMany(models.Release, { onDelete: 'CASCADE' });
  }; */

  /*

  Artist.associate = (models) => {
    Artist.hasMany(models.Comment, { onDelete: 'CASCADE'});
  };

  User.associate = (models) => {
    User.hasMany(models.Release);
  };
  */

  return Artist;
};

export default artist;
