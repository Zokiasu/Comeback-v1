import { Router } from 'express';
import { Op } from 'sequelize';
import { queriesToDict } from '../helpers/routes';
import { addAssociationItems } from '../helpers/routes';
import moment from 'moment';
const router = Router();

router.get('/', async (req, res) => {
  const date = req.query.date;
  delete req.query['date'];
  let whereOptions = {};
  if (date) {
    const day = new Date(date);
    const momentDay = moment(day).startOf('day');
    const startDate = momentDay.format();
    const endDate = momentDay.endOf('day').format();
    whereOptions = {
      date: {
        [Op.between]: [startDate, endDate],
      },
    };
  }
  const releases = await req.context.models.Release.findAll({
    ...queriesToDict(req.query, whereOptions),
    include: [
      req.context.models.Artist,
      req.context.models.Style,
      { model: req.context.models.Music, as: 'musics' },
      { model: req.context.models.User, as: 'followers' },
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
        req.context.models.Style,
        { model: req.context.models.Happening, as: 'events' },
        { model: req.context.models.Music, as: 'musics' },
        { model: req.context.models.User, as: 'followers' },
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

  await addAssociationItems(
    req.body.artists,
    req.body.newArtists,
    req.context.models.Artist,
    (array) => release.addArtists(array),
    (array) => release.createArtist(array),
  );

  await addAssociationItems(
    null,
    req.body.musics,
    req.context.models.Music,
    (array) => release.addMusics(array),
    (array) => release.createMusic(array),
  );

  await addAssociationItems(
    null,
    req.body.styles,
    req.context.models.Style,
    (array) => release.addStyles(array),
    (array) => release.createStyle(array),
    true,
  );

  return res.send(release);
});

router.put('/:releaseId', async (req, res) => {
  const release = await req.context.models.Release.findByPk(
    req.params.releaseId,
  );
  release.update(req.body);

  await addAssociationItems(
    null,
    req.body.artists,
    req.body.newArtists,
    req.context.models.Artist,
    (array) => release.addArtists(array),
    (array) => release.createArtist(array),
  );

  await addAssociationItems(
    null,
    req.body.musics,
    req.context.models.Music,
    (array) => release.addMusics(array),
    (array) => release.createMusic(array),
  );

  await addAssociationItems(
    null,
    req.body.styles,
    req.context.models.Style,
    (array) => release.addStyles(array),
    (array) => release.createStyle(array),
    true,
  );

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
