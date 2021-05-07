import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll({
    include: [{ model: req.context.models.Artist, as: 'artists' }],
  });
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [{ model: req.context.models.Artist, as: 'artists' }],
    },
  );
  return res.send(user);
});

router.post('/', async (req, res) => {
  const user = await req.context.models.User.create(req.body);
  return res.send(user);
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
