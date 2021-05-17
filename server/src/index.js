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
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/requests', routes.request);
app.use('/artists', routes.artist);
app.use('/events', routes.happening);
app.use('/releases', routes.release);
app.use('/musics', routes.music);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createSeeds();
  }

  app.listen(process.env.PORT || 3000, () =>
    console.log(
      `Example app listening on port ${process.env.PORT || 3000}!`,
    ),
  );
});

const createSeeds = async () => {
  await models.User.create(
    {
      id: '1',
      username: 'rwieruch',
      email: 'rwieruch@tst',
      avatar:
        'https://static.wikia.nocookie.net/naruto/images/f/f1/Naruto_Partie_I.png/revision/latest?cb=20151201180820&path-prefix=fr',
      artists: [{ name: 'artist' }],
      requests: [
        {
          state: 'PENDING',
          method: 'POST',
          checked_by: 2,
          endpoint: '/artists',
          body: { name: 'Amir' },
        },
      ],
    },
    {
      include: [models.Artist, models.Request],
    },
  );

  await models.User.create(
    {
      id: '2',
      username: 'ddavids',
      email: 'rwieruch@tt',
    },
    {
      include: [models.Artist, models.Request],
    },
  );

  await models.Artist.create(
    {
      name: 'Rihanna',
      image:
        'https://cdn.radiofrance.fr/s3/cruiser-production/2021/01/9046b609-68b8-494a-9dfd-53ca91a599a4/1200x680_rihanna.jpg',
      description:
        'Rihanna est la plus grande artiste de sa génération voire de la génération humaine',
      socials: ['https://www.facebook.com/Pnlmusic/'],
      platforms: [
        'https://music.youtube.com/channel/UCfl6U7tDZNDYF3KwSrnTgpw',
        'https://open.spotify.com/artist/3NH8t45zOTqzlZgBvZRjvB',
        'https://www.deezer.com/en/artist/1519461',
      ],
      followers: [
        { id: '3', username: 'nom', email: 'email@test.fr' },
      ],
      groups: [{ name: 'group1' }],
      releases: [{ name: 'nomalbum', type: 'SINGLE' }],
    },
    {
      include: [
        { model: models.User, as: 'followers' },
        { model: models.Artist, as: 'groups' },
        { model: models.Artist, as: 'members' },
        models.Release,
      ],
    },
  );
  await models.Artist.create(
    {
      name: 'Alex',
      image:
        'https://cdn.radiofrance.fr/s3/cruiser-production/2021/01/9046b609-68b8-494a-9dfd-53ca91a599a4/1200x680_rihanna.jpg',
      description:
        'Alex est la plus grande artiste de sa génération voire de la génération humaine',
      socials: ['facebooklol'],
      platforms: ['spotift.com'],
      events: [{ name: 'Concert incroyable' }],
    },
    { include: [{ model: models.Happening, as: 'events' }] },
  );

  await models.Release.create(
    {
      name: 'Release1',
      type: 'SINGLE',
      musics: [{ name: 'titre music' }],
    },
    {
      include: [{ model: models.Music, as: 'musics' }],
    },
  );
};
