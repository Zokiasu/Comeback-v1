import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/artists', routes.artist);
app.use('/messages', routes.message);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      avatar:
        'https://static.wikia.nocookie.net/naruto/images/f/f1/Naruto_Partie_I.png/revision/latest?cb=20151201180820&path-prefix=fr',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
      artists: [{ name: 'artist' }],
    },
    {
      include: [models.Message, models.Artist],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message, models.Artist],
    },
  );

  await models.Artist.create(
    {
      name: 'Rihanna',
      image:
        'https://cdn.radiofrance.fr/s3/cruiser-production/2021/01/9046b609-68b8-494a-9dfd-53ca91a599a4/1200x680_rihanna.jpg',
      description:
        'Rihanna est la plus grande artiste de sa génération voire de la génération humaine',
      socials: ['facebooklol'],
      platforms: ['spotift.com'],
      followers: [{ username: 'nom' }],
    },
    {
      include: [{ model: models.User, as: 'followers' }],
    },
  );
  await models.Artist.create({
    name: 'Alex',
    image:
      'https://cdn.radiofrance.fr/s3/cruiser-production/2021/01/9046b609-68b8-494a-9dfd-53ca91a599a4/1200x680_rihanna.jpg',
    description:
      'Alex est la plus grande artiste de sa génération voire de la génération humaine',
    socials: ['facebooklol'],
    platforms: ['spotift.com'],
  });
};
