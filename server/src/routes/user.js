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
      ],
    },
  );
  return res.send(user?.artists || []);
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

  return res.send(user);
});

router.delete('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  user.destroy(req.body);
  return res.send(user);
});

export default router;
