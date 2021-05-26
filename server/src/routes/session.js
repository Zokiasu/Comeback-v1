import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const user = req.context.me;
  return res.send(user);
});

export default router;
