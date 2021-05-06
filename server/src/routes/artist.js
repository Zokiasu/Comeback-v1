import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    include: [
      { model: req.context.models.User, as: 'followers' },
      { model: req.context.models.Artist, as: 'groups' },
      { model: req.context.models.Artist, as: 'members' },
    ],
  });
  return res.send(artists);
});

router.get('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
    {
      include: { model: req.context.models.User, as: 'followers' },
    },
  );
  return res.send(artist);
});

router.post('/', async (req, res) => {
  const artist = await req.context.models.Artist.create(req.body);
  return res.send(artist);
});

export default router;
