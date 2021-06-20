import { Op } from 'sequelize';
import moment from 'moment';

export function removeDuplicates(data, key) {
  return [...new Map(data.map((item) => [key(item), item])).values()];
}

export const queriesToDict = (queries, whereOptions = {}) => {
  const order = queries.sortby?.split(':') || ['createdAt', 'DESC'];
  const limit = queries.limit;
  const offset = queries.offset;
  const op = queries.op;
  delete queries['sortby'];
  delete queries['limit'];
  delete queries['offset'];
  delete queries['op'];

  if (op === 'like') {
    for (const [key, value] of Object.entries(queries)) {
      queries[key] = { [Op.substring]: value };
    }
  } else if (op === 'ilike') {
    for (const [key, value] of Object.entries(queries)) {
      queries[key] = { [Op.iLike]: value };
    }
  }

  return {
    order: [order],
    limit,
    offset,
    where: { ...queries, ...whereOptions },
  };
};

//used when we just want to sortby a js array
export const sortArrayBy = (array, sortBy, type = 'string') => {
  const [key, order] = sortBy;
  if (['updatedAt', 'createdAt'].includes(key)) type = 'date';

  if (type === 'string') {
    array.sort((a, b) => {
      const nameA = a[key].toLowerCase(),
        nameB = b[key].toLowerCase();

      if (order === 'desc') {
        if (nameA > nameB)
          //sort string descending
          return -1;
        if (nameA < nameB) return 1;
        return 0; //default return value (no sorting)
      } else {
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      }
    });
  } else if (type === 'date') {
    array.sort((a, b) => {
      var dateA = new Date(a[key]),
        dateB = new Date(b[key]);
      if (order === 'desc') return dateB - dateA; //sort by date descending
      return dateA - dateB; //sort by date ascending
    });
  }
};

export const addAssociationItems = async (
  items,
  newItems,
  model,
  addItems,
  createItem,
  createIfNotExists = false,
  key = 'name',
) => {
  // setting exisiting
  if (items) {
    const ids = [];
    for (const tmpItem of items) {
      ids.push(tmpItem['id']);
    }
    const requestedItems = await model.findAll({
      where: { id: ids },
    });

    await addItems(requestedItems);
  }

  const findOrCreateItems = [];
  if (newItems) {
    // creating new item and addig them
    for (const newItem of newItems) {
      if (createIfNotExists) {
        const [item, created] = await model.findOrCreate({
          where: { [key]: newItem[key] },
        });
        findOrCreateItems.push(item);
      } else {
        await createItem(newItem);
      }
    }
  }

  if (findOrCreateItems.length) {
    await addItems(
      removeDuplicates(findOrCreateItems, (item) => item.id),
    );
  }
};

// destroys all entities with parents of a model
export const destroyAssociationItems = async (items, parentItems) => {
  for (const item of items) {
    console.log('here', item[parentItems]);
    console.log(item[parentItems].length <= 1);
    if (item[parentItems].length <= 1) {
      console.log('ici', item);
      item.destroy({});
    }
  }
};


// where date equals where option
export const whereDay = (date, key = 'date') => {
  let whereDay = {};
  if (date) {
    const day = new Date(date);
    const momentDay = moment(day).startOf('day');
    const startDate = momentDay.format();
    const endDate = momentDay.endOf('day').format();
    whereDay = {
      [key]: {
        [Op.between]: [startDate, endDate],
      },
    };
  }

  return whereDay;
}
