import Sequelize from 'sequelize';

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  User: sequelize.import('./user'),
  Artist: sequelize.import('./artist'),
  Happening: sequelize.import('./happening'),
  Release: sequelize.import('./release'),
  Music: sequelize.import('./music'),
  Request: sequelize.import('./request'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
