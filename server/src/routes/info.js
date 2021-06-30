import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const infos = await req.context.models.Info.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.User, req.context.models.Artist],
  });
  return res.send(infos);
});

router.get('/:infoId', async (req, res) => {
  const info = await req.context.models.Info.findByPk(
    req.params.infoId,
    {
      include: [req.context.models.User, req.context.models.Artist],
    },
  );
  return res.send(info);
});

router.post('/', async (req, res) => {
  const info = await req.context.models.Info.create(req.body);
  return res.send(info);
});

router.put('/:infoId', async (req, res) => {
  const info = await req.context.models.Info.findByPk(
    req.params.infoId,
  );
  info.update(req.body);
  return res.send(info);
});

router.delete('/:requetId', async (req, res) => {
  const info = await req.context.models.Info.findByPk(
    req.params.requetId,
  );
  info.destroy(req.body);
  return res.send(info);
});

export default router;
