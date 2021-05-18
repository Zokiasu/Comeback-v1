import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const sortby = req.query.sortby?.split(':') || [
    'createdAt',
    'DESC',
  ];
  const limit = req.query.limit;
  const offset = req.query.offset;
  delete req.query['sortby'];
  delete req.query['limit'];
  delete req.query['offset'];
  const artists = await req.context.models.Artist.findAll({
    limit,
    offset,
    where: req.query,
    order: [sortby],
  });
  return res.send(artists);
});

router.get('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
    {
      include: [
        { model: req.context.models.User, as: 'followers' },
        { model: req.context.models.Artist, as: 'groups' },
        { model: req.context.models.Artist, as: 'members' },
        { model: req.context.models.Happening, as: 'events' },
        req.context.models.Release,
      ],
    },
  );
  return res.send(artist);
});

router.post('/', async (req, res) => {
  const artist = await req.context.models.Artist.create(req.body);
  return res.send(artist);
});

router.put('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  artist.update(req.body);
  return res.send(artist);
});

router.delete('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  artist.destroy(req.body);
  return res.send(artist);
});

export default router;
