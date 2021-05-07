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
    },

    method: {
      type: DataTypes.ENUM(METHODS.PUT, METHODS.POST, METHODS.DELETE),
      allowNull: false,
    },

    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    checked_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    body: {
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
