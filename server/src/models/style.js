const style = (sequelize, DataTypes) => {
  const Style = sequelize.define('style', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
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
