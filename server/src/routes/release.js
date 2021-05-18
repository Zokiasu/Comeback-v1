import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const releases = await req.context.models.Release.findAll({
    ...queriesToDict(req.query),
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
  const release = await req.context.models.Release.create(
    req.body,
    {},
  );

  // adding artist at creation
  if (req.body.artistId) {
    const artist = await req.context.models.Artist.findByPk(
      req.body.artistId,
    );
    release.addArtist(artist);
  } else if (req.body.artistName) {
    release.createArtist({ name: req.body.artistName });
  }

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

// handling artists

router.put('/:releaseId/artists', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  if (req.body.artistId) {
    const artist = await req.context.models.Artist.findByPk(
      req.body.artistId,
    );
    release.addArtist(artist);
  } else if (req.body.artistName) {
    release.createArtist({ name: req.body.artistName });
  }

  return res.send(release);
});

router.delete('/:releaseId/artists/:artistId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  release.removeArtist(artist);

  return res.send(release);
});

export default router;
