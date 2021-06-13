import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';
import moment from 'moment';

const router = Router();

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const getDates = (startDate, stopDate) => {
  const dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};

const sortDateDict = (dates) => {
  const orderedDates = {};
  //sort key from earliest date to last date
  Object.keys(dates)
    .sort(function (a, b) {
      return (
        moment(a, 'MM/DD/YYYY').toDate() -
        moment(b, 'MM/DD/YYYY').toDate()
      );
    })
    .forEach(function (key) {
      orderedDates[key] = dates[key];
    });
  return orderedDates;
};

const createDateDict = (
  items,
  key = 'item',
  dates = {},
  query = {},
) => {
  // create a dict of items with their date as key
  for (const item of items) {
    if (!!item.date) {
      const day = new Date(item.date);
      const momentDay = moment(day).format('MM/DD/YYYY');
      // if the date is not between date_inf and date_sup we don't add it
      if (
        (query.date_inf && day > query.date_inf) ||
        (query.date_sup && day < query.date_sup)
      ) {
        continue;
      }
      if (!dates[momentDay]) {
        dates[momentDay] = {};
      }
      if (!dates[momentDay][key]) {
        dates[momentDay][key] = [];
      }
      dates[momentDay][key].push(item);
    } else if (!!item.startDate) {
      for (const item of items) {
        for (const date of getDates(item.startDate, item.endDate)) {
          const day = new Date(date);
          const momentDay = moment(day).format('MM/DD/YYYY');
          // if the date is not between date_inf and date_sup we don't add it
          if (
            (query.date_inf && day > query.date_inf) ||
            (query.date_sup && day < query.date_sup)
          ) {
            continue;
          }
          if (!dates[momentDay]) {
            dates[momentDay] = {};
          }
          if (!dates[momentDay][key]) {
            dates[momentDay][key] = [];
          }
          dates[momentDay][key].push(item);
        }
      }
    }
  }
  return dates;
};

router.get('/', async (req, res) => {
  const dateQuery = {
    date_inf: req.query.date_inf
      ? new Date(req.query.date_inf)
      : null,
    date_sup: req.query.date_sup
      ? new Date(req.query.date_sup)
      : null,
  };

  delete req.query['date_inf'];
  delete req.query['date_sup'];

  const releases = await req.context.models.Release.findAll({
    ...queriesToDict(req.query),
    include: [
      req.context.models.Artist,
      { model: req.context.models.User, as: 'followers' },
    ],
  });

  const artists = await req.context.models.Artist.findAll({
    ...queriesToDict(req.query),
    include: [{ model: req.context.models.Happening, as: 'events' }],
  });

  let dates = createDateDict(releases, 'releases', {}, dateQuery);
  for (const artist of artists) {
    dates = createDateDict(artist.events, 'events', dates, dateQuery);
  }
  return res.send(sortDateDict(dates));
});

router.get('/:userId', async (req, res) => {
  const dateQuery = {
    date_inf: req.query.date_inf
      ? new Date(req.query.date_inf)
      : null,
    date_sup: req.query.date_sup
      ? new Date(req.query.date_sup)
      : null,
  };
  delete req.query['date_inf'];
  delete req.query['date_sup'];
  const user = await req.context.models.User.findByPk(
    req.params.userId,
    {
      include: [
        {
          model: req.context.models.Release,
          as: 'releases',
          ...queriesToDict(req.query),
        },
        {
          model: req.context.models.Artist,
          include: [
            {
              model: req.context.models.Release,
              as: 'releases',
              ...queriesToDict(req.query),
            },
            { model: req.context.models.Happening, as: 'events' },
          ],
        },
      ],
    },
  );

  let releases = user?.releases || [];
  const artists = user?.artists || [];
  for (const artist of artists) {
    releases = releases.concat(artist.releases);
  }

  let dates = createDateDict(releases, 'releases', {}, dateQuery);
  for (const artist of artists) {
    dates = createDateDict(artist.events, 'events', dates, dateQuery);
  }

  return res.send(sortDateDict(dates));
});

export default router;
