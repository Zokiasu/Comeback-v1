import { Router } from 'express';
import {
  addAssociationItems,
  queriesToDict,
  removeDuplicates,
} from '../helpers/routes';

const router = Router();

const getSoloMembers = async (members, model) => {
  const ids = [];
  for (const member of members) {
    ids.push(member['id']);
  }
  let soloMembers = await model.findAll({
    where: { id: ids, type: 'SOLO' },
  });

  const groups = await model.findAll({
    where: { id: ids, type: 'GROUP' },

    include: [{ model: model, as: 'members' }],
  });

  for (const group of groups) {
    if (group.members.length) {
      const groupMembers = await getSoloMembers(group.members, model);
      soloMembers = soloMembers.concat(groupMembers);
    }
  }
  return removeDuplicates(soloMembers, (item) => item.id);
};

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

router.get('/:artistId/members', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
    {
      include: [{ model: req.context.models.Artist, as: 'members' }],
    },
  );

  const members = await getSoloMembers(
    artist.members,
    req.context.models.Artist,
  );
  return res.send(members);
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
