const happening = (sequelize, DataTypes) => {
  const Happening = sequelize.define('happening', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(2000),
      unique: false,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
  });

  Happening.associate = (models) => {
    Happening.belongsToMany(models.Artist, {
      through: 'Happening_Artist',
    });
    Happening.belongsToMany(models.Release, {
      through: 'Happening_Release',
    });
  };

  return Happening;
};

export default happening;
