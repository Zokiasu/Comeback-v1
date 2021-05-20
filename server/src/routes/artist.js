import { Router } from 'express';
import {
  addAssociationItems,
  queriesToDict,
} from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const artists = await req.context.models.Artist.findAll(
    queriesToDict(req.query),
  );
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
        {
          model: req.context.models.Release,
          include: [
            { model: req.context.models.Music, as: 'musics' },
          ],
        },
      ],
    },
  );
  return res.send(artist);
});

router.post('/', async (req, res) => {
  const artist = await req.context.models.Artist.create(req.body);

  await addAssociationItems(
    req.body.groups,
    req.body.newGroups,
    req.context.models.Artist,
    (array) => artist.addGroups(array),
    (array) => artist.createGroup(array),
  );

  await addAssociationItems(
    req.body.members,
    req.body.newMembers,
    req.context.models.Artist,
    (array) => artist.addMembers(array),
    (array) => artist.createMember(array),
  );
  return res.send(artist);
});

router.put('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
  );
  artist.update(req.body);

  await addAssociationItems(
    req.body.groups,
    req.body.newGroups,
    req.context.models.Artist,
    (array) => artist.addGroups(array),
    (array) => artist.createGroup(array),
  );

  await addAssociationItems(
    req.body.members,
    req.body.newMembers,
    req.context.models.Artist,
    (array) => artist.addMembers(array),
    (array) => artist.createMember(array),
  );
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
