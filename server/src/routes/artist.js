import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const artists = await req.context.models.Artist.findAll();
  return res.send(artists);
});

router.get('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  return res.send(artist);
});

export default router;
