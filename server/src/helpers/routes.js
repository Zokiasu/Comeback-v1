import { Op } from 'sequelize';

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
  }

  return {
    order: [order],
    limit,
    offset,
    where: { ...queries, ...whereOptions },
  };
};

export const addAssociationItems = async (
  items,
  newItems,
  model,
  addItems,
  createItem,
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

    addItems(requestedItems);
  }

  if (newItems) {
    // creating new item and addig them
    for (const newItem of newItems) {
      createItem(newItem);
    }
  }
};
