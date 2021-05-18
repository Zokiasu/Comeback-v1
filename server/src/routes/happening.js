import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const happenings = await req.context.models.Happening.findAll({
    ...queriesToDict(req.query),
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

router.post('/', async (req, res) => {
  const happening = await req.context.models.Happening.create(
    req.body,
  );
  return res.send(happening);
});

router.put('/:happeningId', async (req, res) => {
  const happening = await req.context.models.Happening.findByPk(
    req.params.happeningId,
  );
  happening.update(req.body);
  return res.send(happening);
});

router.delete('/:happeningId', async (req, res) => {
  const happening = await req.context.models.Happening.findByPk(
    req.params.happeningId,
  );
  happening.destroy(req.body);
  return res.send(happening);
});

export default router;
