import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const releases = await req.context.models.Release.findAll({
    include: [
      req.context.models.Artist,
      { model: req.context.models.Music, as: 'musics' },
    ],
  });
  return res.send(releases);
});

router.get('/:releaseId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
    {
      include: [
        req.context.models.Artist,
        { model: req.context.models.Music, as: 'musics' },
      ],
    },
  );
  return res.send(release);
});

router.post('/', async (req, res) => {
  const release = await req.context.models.Release.create(req.body);
  return res.send(release);
});

router.put('/:releaseId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  release.update(req.body);
  return res.send(release);
});

router.delete('/:releaseId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  release.destroy(req.body);
  return res.send(release);
});

export default router;
