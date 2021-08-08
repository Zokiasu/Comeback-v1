import { Router } from 'express';
import {
  addAssociationItems,
  destroyAssociationItems,
  queriesToDict,
  removeDuplicates,
  sortArrayBy,
} from '../helpers/routes';

const router = Router();

const getSoloMembers = async (members, model, req) => {
  const ids = [];
  for (const member of members) {
    ids.push(member['id']);
  }
  let soloMembers = await model.findAll({
    ...queriesToDict(req.query, { id: ids, type: 'SOLO' }),
  });

  const groups = await model.findAll({
    where: { id: ids, type: 'GROUP' },

    include: [{ model: model, as: 'members' }],
  });

  for (const group of groups) {
    if (group.members.length) {
      const groupMembers = await getSoloMembers(
        group.members,
        model,
        req,
      );
      soloMembers = soloMembers.concat(groupMembers);
    }
  }
  return removeDuplicates(soloMembers, (item) => item.id);
};

router.get('/', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      req.context.models.Style,
    ],
  });
  return res.send(artists);
});

router.get('/groups', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.Artist, as: 'groups' },
      req.context.models.Style,
    ],
  });
  return res.send(artists);
});

router.get('/members', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.Artist, as: 'members' },
      req.context.models.Style,
    ],
  });
  return res.send(artists);
});

router.get('/followers', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.User, as: 'followers' },
      req.context.models.Style,
    ],
  });
  return res.send(artists);
});

router.get('/events', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.Happening, as: 'events' },
      req.context.models.Style,
    ],
  });
  return res.send(artists);
});

router.get('/full', async (req, res) => {
  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [
      { model: req.context.models.User, as: 'followers' },
      { model: req.context.models.Artist, as: 'groups' },
      { model: req.context.models.Artist, as: 'members' },
      { model: req.context.models.Happening, as: 'events' },
      req.context.models.Style,
      {
        model: req.context.models.Release,
        include: [{ model: req.context.models.Music, as: 'musics' }],
      },
    ],
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
        req.context.models.Style,
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

  // we need this because we can't sort by with classic queries
  const sortBy = req.query.sortby?.split(':') || [
    'createdAt',
    'DESC',
  ];

  const members = await getSoloMembers(
    artist.members,
    req.context.models.Artist,
    req,
  );

  // we need this because we can't sort by with classic queries
  sortArrayBy(members, sortBy);

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

  await addAssociationItems(
    null,
    req.body.styles,
    req.context.models.Style,
    (array) => artist.addStyles(array),
    (array) => artist.createStyle(array),
    true,
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

  await addAssociationItems(
    null,
    req.body.styles,
    req.context.models.Style,
    (array) => artist.addStyles(array),
    (array) => artist.createStyle(array),
    true,
  );
  return res.send(artist);
});

router.delete('/:artistId', async (req, res) => {
  const artist = await req.context.models.Artist.findByPk(
    req.params.artistId,
    {
      include: [
        {
          model: req.context.models.Release,
          include: [req.context.models.Artist],
        },
      ],
    },
  );

  artist.destroy(req.body);
  destroyAssociationItems(artist.releases, 'artists');
  return res.send(artist);
});

export default router;
