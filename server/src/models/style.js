const style = (sequelize, DataTypes) => {
  const Style = sequelize.define('style', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  Style.associate = (models) => {
    Style.belongsToMany(models.Release, {
      through: 'Release_Style',
    });
    Style.belongsToMany(models.Artist, {
      through: 'Artist_Style',
    });
  };

  return Style;
};

export default style;
