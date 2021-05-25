import { REQUESTS, METHODS } from '../constants';

const request = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    state: {
      type: DataTypes.ENUM(
        REQUESTS.ACCEPTED,
        REQUESTS.DENIED,
        REQUESTS.PENDING,
      ),
      allowNull: false,
      defaultValue: REQUESTS.PENDING,
    },

    method: {
      type: DataTypes.ENUM(METHODS.PUT, METHODS.POST, METHODS.DELETE),
      allowNull: false,
    },

    source: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },

    checked_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    body: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    current_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  Request.associate = (models) => {
    Request.belongsTo(models.User);
  };

  return Request;
};

export default request;
