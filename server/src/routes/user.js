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

export default router;
