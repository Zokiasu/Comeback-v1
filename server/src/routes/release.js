import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const releases = await req.context.models.Release.findAll({
    include: [req.context.models.Artist],
  });
  return res.send(releases);
});

router.get('/:releaseId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
    {
      include: [req.context.models.Artist],
    },
  );
  return res.send(release);
});

export default router;
