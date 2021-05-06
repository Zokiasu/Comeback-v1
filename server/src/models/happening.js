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
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
  });

  Happening.associate = (models) => {
    Happening.belongsToMany(models.Artist, {
      through: 'Happening_Artist',
    });
  };

  return Happening;
};

export default happening;
