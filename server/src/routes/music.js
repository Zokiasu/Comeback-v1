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

router.post('/', async (req, res) => {
  const music = await req.context.models.Music.create(req.body);
  return res.send(music);
});

router.put('/:musicId', async (req, res) => {
  const music = await req.context.models.Music.findByPk(
    req.params.musicId,
  );
  music.update(req.body);
  return res.send(music);
});

router.delete('/:musicId', async (req, res) => {
  const music = await req.context.models.Music.findByPk(
    req.params.musicId,
  );
  music.destroy(req.body);
  return res.send(music);
});

export default router;
