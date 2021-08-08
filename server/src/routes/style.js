import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const styles = await req.context.models.Style.findAll({
    ...queriesToDict(req.query),
  });
  return res.send(styles);
});

router.get('/artist', async (req, res) => {
  const styles = await req.context.models.Style.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.Artist],
  });
  return res.send(styles);
});

router.get('/release', async (req, res) => {
  const styles = await req.context.models.Style.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.Release],
  });
  return res.send(styles);
});

router.get('/full', async (req, res) => {
  const styles = await req.context.models.Style.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.Artist, req.context.models.Release],
  });
  return res.send(styles);
});

router.get('/:styleId', async (req, res) => {
  const style = await req.context.models.Style.findByPk(
    req.params.styleId,
    {
      include: [
        req.context.models.Artist,
        req.context.models.Release,
      ],
    },
  );
  return res.send(style);
});

router.post('/', async (req, res) => {
  const style = await req.context.models.Style.create(req.body);
  return res.send(style);
});

router.put('/:styleId', async (req, res) => {
  const style = await req.context.models.Style.findByPk(
    req.params.styleId,
  );
  style.update(req.body);
  return res.send(style);
});

router.delete('/:styleId', async (req, res) => {
  const style = await req.context.models.Style.findByPk(
    req.params.styleId,
  );
  style.destroy(req.body);
  return res.send(style);
});

export default router;
