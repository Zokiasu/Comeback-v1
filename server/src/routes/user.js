import { Router } from 'express';
import {
  addAssociationItems,
  queriesToDict,
} from '../helpers/routes';
import { createUser } from '../firebase/user';
import { hasRoles } from '../firebase/authorization';
import { ROLES } from '../constants';
import { checkIfAuthenticated } from '../firebase/authentication';

const router = Router();

router.post('/auth/signup', createUser);

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.Artist, as: 'artists' },
      req.context.models.Release,
      req.context.models.Request,
    ],
  });
  return res.send(users);
});

// test auth and admin

router.get('/testauth', checkIfAuthenticated, async (req, res) => {
  const users = await req.context.models.User.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.Artist, as: 'artists' },
      req.context.models.Release,
      req.context.models.Request,
    ],
  });
  return res.send(users);
});

router.get(
  '/testadmin',
  (req, res, next) => {
    hasRoles(req, res, next, [ROLES.ADMIN]);
  },
  async (req, res) => {
    const users = await req.context.models.User.findAll({
      ...queriesToDict(req.query),
      include: [
        { model: req.context.models.Artist, as: 'artists' },
        req.context.models.Release,
        req.context.models.Request,
      ],
    });
    return res.send(users);
  },
);

// end of test

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [
        { model: req.context.models.Artist, as: 'artists' },
        req.context.models.Release,
        req.context.models.Request,
        req.context.models.Notification,
      ],
    },
  );
  return res.send(user);
});

router.get('/:userId/artists', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [
        {
          model: req.context.models.Artist,
          as: 'artists',
          ...queriesToDict(req.query),
        },
        req.context.models.Release,
      ],
    },
  );
  return res.send(user?.artists || []);
});

router.get('/:userId/releases', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [
        {
          model: req.context.models.Release,
          as: 'releases',
          ...queriesToDict(req.query),
        },
        req.context.models.Artist,
      ],
    },
  );
  return res.send(user?.releases || []);
});

router.get('/:userId/notifications', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [
        {
          model: req.context.models.Notification,
          as: 'notifications',
          ...queriesToDict(req.query),
        },
      ],
    },
  );
  return res.send(user?.notifications || []);
});

router.post('/', async (req, res) => {
  const user = await req.context.models.User.create(req.body);
  return res.send(user);
});

router.post('/:userId/notifications', async (req, res) => {
  const notification = await req.context.models.Notification.create({
    userId: req.params.userId,
    ...req.body,
  });
  return res.send(notification);
});

router.put('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  user.update(req.body);

  await addAssociationItems(
    req.body.artists,
    req.body.newArtists,
    req.context.models.Artist,
    (array) => user.addArtists(array),
    (array) => user.createArtist(array),
  );

  await addAssociationItems(
    req.body.releases,
    req.body.newReleases,
    req.context.models.Release,
    (array) => user.addReleases(array),
    (array) => user.createRelease(array),
  );

  return res.send(user);
});

router.delete('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  user.destroy(req.body);
  return res.send(user);
});

// handling artists and releases

router.delete('/:userId/artists/:artistId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  user.removeArtist(artist);

  return res.send(user);
});

router.delete('/:userId/releases/:releaseId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  user.removeRelease(release);

  return res.send(user);
});

export default router;
