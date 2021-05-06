import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const happenings = await req.context.models.Happening.findAll({
    include: [req.context.models.Artist],
  });
  return res.send(happenings);
});

router.get('/:happeningId', async (req, res) => {
  const happening = await req.context.models.Happening.findByPk(
    req.params.happeningId,
    {
      include: [req.context.models.Artist],
    },
  );
  return res.send(happening);
});

export default router;
