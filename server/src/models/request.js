import { REQUESTS, METHODS } from '../constants';

const request = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
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
      allowNull: true,
    },

    checked_by: {
      type: DataTypes.STRING,
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

    currentData: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    editedByModerator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  Request.associate = (models) => {
    Request.belongsTo(models.User);
  };

  return Request;
};

export default request;
