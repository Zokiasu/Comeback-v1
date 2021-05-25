import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';
import { createUser } from '../firebase/user';

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
