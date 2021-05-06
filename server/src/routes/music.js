import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const musics = await req.context.models.Music.findAll({
    include: [req.context.models.Release],
  });
  return res.send(musics);
});

router.get('/:musicId', async (req, res) => {
  const music = await req.context.models.Music.findByPk(
    req.params.musicId,
    {
      include: [req.context.models.Release],
    },
  );
  return res.send(music);
});

export default router;
